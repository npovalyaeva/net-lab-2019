using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Text;

using Reservation.Data;

namespace Reservation.Handlers
{
    public class GetReservationsByUserIdHandler
    {
        private readonly ReservationContext _context;

        public GetReservationsByUserIdHandler(ReservationContext context)
        {
            _context = context;
        }

        public List<Model.Reservation> Handle(int userId)
        {
            List<Model.Reservation> list = new List<Model.Reservation>();

            using (SqlConnection connection = _context.GetConnection())
            {
                connection.Open();

                string query = string.Format("SELECT Reservations.reservation_id, Reservations.date_of_reservation, " +
                    "Books.book_id, Books.title, Books.year, Books.cover, " +
                    "Authors.author_id, Authors.last_name, Authors.first_name, Authors.patronymic, " +
                    "Statuses.status_id, Statuses.name" +
                    "FROM [dbo].[Reservations] AS Reservations " +
                    "JOIN [dbo].[Books] AS Books " +
                    "ON (Reservations.book_id = Books.book_id) " +
                    "JOIN [dbo].[Authors] AS Authors " +
                    "ON (Books.author_id = Authors.author_id) " +
                    "JOIN [dbo].[Statuses] AS Statuses " +
                    "ON (Reservations.status_id = Statuses.status_id) " +
                    "WHERE [user_id] = {0}", userId);

                SqlCommand cmd = new SqlCommand(query, connection);

                try
                {
                    using (var reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            Book.Model.Book book = new Book.Model.Book();
                            Status.Model.Status status = new Status.Model.Status();

                            book.Id = Convert.ToInt32(reader["book_id"]);
                            book.Title = reader["title"].ToString();
                            book.Year = Convert.ToInt32(reader["year"]);
                            book.Cover = Array.ConvertAll<byte, byte?>(Encoding.ASCII.GetBytes(reader["cover"].ToString()),
                                delegate (byte b)
                                {
                                    return b;
                                }
                            );
                            book.Author = new Author.Model.Author();
                            book.Author.Id = Convert.ToInt32(reader["author_id"]);
                            book.Author.LastName = reader["last_name"].ToString();
                            book.Author.FirstName = reader["first_name"].ToString();
                            book.Author.Patronymic = reader["patronymic"].ToString();

                            status.Id = Convert.ToInt32(reader["status_id"]);
                            status.Name = reader["name"].ToString();

                            list.Add(new Model.Reservation()
                            {
                                Id = Convert.ToInt32(reader["reservation_id"]),
                                Status = status,
                                Book = book,
                                DateOfReservation = Convert.ToDateTime(reader["date_of_reservation"])
                            }); ;
                        }
                    }
                }
                catch (Exception ex)
                {
                    string exc = ex.ToString();
                    return null;
                }
                finally
                {
                    connection.Close();
                }
            }
            return list;
        }
    }
}

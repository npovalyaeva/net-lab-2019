using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Text;

using Reservation.Data;

namespace Reservation.Handlers
{
    public class GetHandedOutReservationsByAuthorLastNameHandler
    {
        private readonly ReservationContext _context;

        public GetHandedOutReservationsByAuthorLastNameHandler(ReservationContext context)
        {
            _context = context;
        }

        public List<Model.Reservation> Handle(string authorLastName)
        {
            // TODO: Change 'using' or create new formatting entity
            authorLastName = Book.Data.Formatting.FormatString(authorLastName);

            List<Model.Reservation> list = new List<Model.Reservation>();

            using (SqlConnection connection = _context.GetConnection())
            {
                connection.Open();

                string query = string.Format("SELECT Reservations.reservation_id, Reservations.date_of_reservation, " +
                    "Books.book_id, Books.title, Books.year, Books.cover, " +
                    "Authors.author_id, Authors.last_name, Authors.first_name, Authors.patronymic, " +
                    "Users.user_id, Users.username, Users.email, Users.first_name, Users.last_name " +
                    "FROM [dbo].[Reservations] AS Reservations " +
                    "JOIN [dbo].[Books] AS Books " +
                    "ON (Reservations.book_id = Books.book_id) " +
                    "JOIN [dbo].[Authors] AS Authors " +
                    "ON (Books.author_id = Authors.author_id) " +
                    "JOIN [dbo].[Users] AS Users " +
                    "ON (Reservations.user_id = Users.user_id) " +
                    "WHERE ([status_id] = 2 AND [Authors].[last_name] = N'{0}')", authorLastName);

                SqlCommand cmd = new SqlCommand(query, connection);

                try
                {
                    using (var reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            Book.Model.Book book = new Book.Model.Book();
                            User.Model.User user = new User.Model.User();

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

                            user.Id = Convert.ToInt32(reader["user_id"]);
                            user.Username = reader["username"].ToString();
                            user.Email = reader["email"].ToString();
                            user.FirstName = reader["first_name"].ToString();
                            user.LastName = reader["last_name"].ToString();

                            list.Add(new Model.Reservation()
                            {
                                Id = Convert.ToInt32(reader["reservation_id"]),
                                User = user,
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

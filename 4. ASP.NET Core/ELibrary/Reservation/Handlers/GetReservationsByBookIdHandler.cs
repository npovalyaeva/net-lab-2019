using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Text;

using Reservation.Data;

namespace Reservation.Handlers
{
    public class GetReservationsByBookIdHandler
    {
        private readonly ReservationContext _context;

        public GetReservationsByBookIdHandler(ReservationContext context)
        {
            _context = context;
        }

        public List<Model.Reservation> Handle(int bookId)
        {
            List<Model.Reservation> list = new List<Model.Reservation>();

            using (SqlConnection connection = _context.GetConnection())
            {
                connection.Open();

                string query = string.Format("SELECT Users.user_id, Users.username, Users.email, Users.first_name, Users.last_name, " +
                    "Reservations.reservation_id, Reservations.book_id, Reservations.date_of_reservation, " +
                    "Statuses.status_id, Statuses.name " +
                    "FROM [dbo].[Users] AS Users " +
                    "JOIN [dbo].[Reservations] AS Reservations " +
                    "ON (Users.user_id = Reservations.user_id) " +
                    "JOIN [dbo].[Statuses] AS Statuses " +
                    "ON (Reservations.status_id = Statuses.status_id) " +
                    "JOIN [dbo].[Roles] AS Roles " +
                    "ON (Users.role_id = Roles.role_id) " +
                    "WHERE [book_id] = {0}", bookId);

                SqlCommand cmd = new SqlCommand(query, connection);

                try
                {
                    using (var reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            Book.Model.Book book = new Book.Model.Book();
                            Status.Model.Status status = new Status.Model.Status();
                            User.Model.User user = new User.Model.User();

                            book.Id = Convert.ToInt32(reader["book_id"]);

                            status.Id = Convert.ToInt32(reader["status_id"]);
                            status.Name = reader["name"].ToString();

                            user.Id = Convert.ToInt32(reader["user_id"]);
                            user.Username = reader["username"].ToString();
                            user.Email = reader["email"].ToString();
                            user.FirstName = reader["first_name"].ToString();
                            user.LastName = reader["last_name"].ToString();

                            list.Add(new Model.Reservation()
                            {
                                Id = Convert.ToInt32(reader["reservation_id"]),
                                Status = status,
                                Book = book,
                                User = user,
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

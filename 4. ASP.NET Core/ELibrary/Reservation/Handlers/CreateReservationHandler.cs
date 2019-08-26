using System.Data.SqlClient;

using Mapster;

using Reservation.Commands;
using Reservation.Data;

using System;

namespace Reservation.Handlers
{
    public class CreateReservationHandler
    {

        private readonly ReservationContext _context;

        public CreateReservationHandler(ReservationContext context)
        {
            _context = context;
        }

        public bool Handle(CreateReservationCommand request)
        {
            var model = request.Adapt<Model.Reservation>();

            using (SqlConnection connection = _context.GetConnection())
            {
                connection.Open();
                string query = string.Format(
                    "INSERT [dbo].[Reservations] ([status_id], [book_id], [user_id], [date_of_reservation]) " +
                    "VALUES({0}, {1}, {2}, '{3}') " +
                    "DECLARE @freeCopiesCount INT " +
                    "SELECT @freeCopiesCount = (SELECT [free_copies_count] FROM [dbo].[Books] WHERE [book_id] = {1}) " +
                    "UPDATE [dbo].[Books] " +
                    "SET [free_copies_count] = (@freeCopiesCount - 1) " +
                    "WHERE [book_id] = {1}",
                    model.Status.Id,
                    model.Book.Id,
                    model.User.Id,
                    DateTime.Now
                ); ;
                SqlCommand cmd = new SqlCommand(query, connection);
                try
                {
                    cmd.ExecuteNonQuery();
                    // TODO: Logging
                }
                catch (Exception ex)
                {
                    string e = ex.ToString();
                    return false;
                }
                finally
                {
                    connection.Close();
                }
            }

            return true;
        }
    }
}

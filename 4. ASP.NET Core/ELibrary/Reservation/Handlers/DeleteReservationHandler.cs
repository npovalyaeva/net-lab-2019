using System;
using System.Data.SqlClient;

using Reservation.Commands;
using Reservation.Data;

namespace Reservation.Handlers
{
    public class DeleteReservationHandler
    {
        private readonly ReservationContext _context;

        public DeleteReservationHandler(ReservationContext context)
        {
            _context = context;
        }

        public bool Handle(int reservationId)
        {
            using (SqlConnection connection = _context.GetConnection())
            {
                connection.Open();
                string query = string.Format(
                    "DECLARE @bookId INT " +
                    "SELECT @bookId = (SELECT [book_id] FROM [dbo].[Reservations] WHERE [reservation_id] = {0}) " +
                    "DELETE FROM [dbo].[Reservations] " +
                    "WHERE [reservation_id] = {0} " +
                    "DECLARE @freeCopiesCount INT " +
                    "SELECT @freeCopiesCount = (SELECT [free_copies_count] FROM [dbo].[Books] WHERE [book_id] = @bookId) " +
                    "UPDATE [dbo].[Books] " +
                    "SET [free_copies_count] = (@freeCopiesCount + 1) " +
                    "WHERE [book_id] = @bookId",
                    reservationId
                );
                SqlCommand cmd = new SqlCommand(query, connection);

                try
                {
                    cmd.ExecuteNonQuery();
                    // TODO: Logging
                }
                catch (Exception ex)
                {
                    string s = ex.Message;
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

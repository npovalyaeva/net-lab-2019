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
                string query = string.Format("DELETE FROM [dbo].[Reservations] " +
                    "WHERE [reservation_id] = {0}",
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

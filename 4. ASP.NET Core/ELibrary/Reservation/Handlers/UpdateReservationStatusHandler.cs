using System;
using System.Data.SqlClient;

using Reservation.Commands;
using Reservation.Data;

namespace Reservation.Handlers
{
    public class UpdateReservationStatusHandler
    {
        private readonly ReservationContext _context;

        public UpdateReservationStatusHandler(ReservationContext context)
        {
            _context = context;
        }

        public bool Handle(string reservationId, int statusId)
        {

            using (SqlConnection connection = _context.GetConnection())
            {
                connection.Open();
                string query = string.Format("UPDATE [dbo].[Reservations] SET [status_id] = {0} " +
                    "WHERE [reservation_id] = {1}",
                    statusId,
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

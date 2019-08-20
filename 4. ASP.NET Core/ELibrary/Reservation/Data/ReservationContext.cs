using System.Data.SqlClient;

namespace Reservation.Data
{
    public class ReservationContext
    {
        public string ConnectionString { get; set; }

        public ReservationContext(string connectionString)
        {
            this.ConnectionString = connectionString;
        }

        public SqlConnection GetConnection()
        {
            return new SqlConnection(ConnectionString);
        }
    }
}
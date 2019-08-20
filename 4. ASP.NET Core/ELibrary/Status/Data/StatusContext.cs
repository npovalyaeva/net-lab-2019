using System.Data.SqlClient;

namespace Status.Data
{
    public class StatusContext
    {
        public string ConnectionString { get; set; }

        public StatusContext(string connectionString)
        {
            this.ConnectionString = connectionString;
        }

        public SqlConnection GetConnection()
        {
            return new SqlConnection(ConnectionString);
        }
    }
}

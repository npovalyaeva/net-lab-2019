using System.Data.SqlClient;

namespace Book.Data
{
    public class BookContext
    {
        public string ConnectionString { get; set; }

        public BookContext(string connectionString)
        {
            this.ConnectionString = connectionString;
        }

        public SqlConnection GetConnection()
        {
            return new SqlConnection(ConnectionString);
        }
    }
}

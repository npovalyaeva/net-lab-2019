using System.Data.SqlClient;

namespace Author.Data
{
    public class AuthorContext
    {
        public string ConnectionString { get; set; }

        public AuthorContext(string connectionString)
        {
            this.ConnectionString = connectionString;
        }

        public SqlConnection GetConnection()
        {
            return new SqlConnection(ConnectionString);
        }
    }
}

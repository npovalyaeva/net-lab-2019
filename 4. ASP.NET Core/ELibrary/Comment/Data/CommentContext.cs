using System.Data.SqlClient;

namespace Comment.Data
{
    public class CommentContext
    {
        public string ConnectionString { get; set; }

        public CommentContext(string connectionString)
        {
            this.ConnectionString = connectionString;
        }

        public SqlConnection GetConnection()
        {
            return new SqlConnection(ConnectionString);
        }
    }
}

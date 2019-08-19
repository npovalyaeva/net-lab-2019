using System;

using System.Data.SqlClient;
using User.Commands;
using User.Data;

namespace User.Handlers
{
    public class UnblockUserHandler
    {
        private readonly UserContext _context;

        public UnblockUserHandler(UserContext context)
        {
            _context = context;
        }

        public bool Handle(string username)
        {

            using (SqlConnection connection = _context.GetConnection())
            {
                connection.Open();
                string query = string.Format("UPDATE [dbo].[Users] SET [is_blocked] = 0 WHERE [username] = N'{0}'", username);
                SqlCommand cmd = new SqlCommand(query, connection);

                try
                {
                    cmd.ExecuteNonQuery();
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

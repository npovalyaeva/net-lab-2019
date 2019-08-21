using System;

using System.Data.SqlClient;
using User.Commands;
using User.Data;

namespace User.Handlers
{
    public class BlockUserHandler
    {
        private readonly UserContext _context;

        public BlockUserHandler(UserContext context)
        {
            _context = context;
        }

        public bool Handle(int userId, string blockedReason)
        {

            using (SqlConnection connection = _context.GetConnection())
            {
                connection.Open();
                string query = string.Format("UPDATE [dbo].[Users] SET [is_blocked] = 1 " +
                    "WHERE [user_id] = {0} " +
                    "UPDATE [dbo].[Users] SET [blocked_reason] = N'{1}' " +
                    "WHERE [user_id] = {0} " +
                    "DELETE FROM [dbo].[Reservations] " +
                    "WHERE [user_id] = {0}", userId, blockedReason);
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

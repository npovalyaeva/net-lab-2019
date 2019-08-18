using System;

using Mapster;
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

        public bool Handle(string username, CreateUserCommand request)
        {
            var model = request.Adapt<Model.User>();

            using (SqlConnection connection = _context.GetConnection())
            {
                connection.Open();
                string query = string.Format("UPDATE [dbo].[Users] SET [is_blocked] = 1 WHERE [username] = N'{0}'", username);
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

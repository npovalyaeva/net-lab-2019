using System;
using System.Data.SqlClient;

using User.Data;

namespace User.Handlers
{
    public class CheckIsUsernameUniqueHandler
    {
        private readonly UserContext _context;

        public CheckIsUsernameUniqueHandler(UserContext context)
        {
            _context = context;
        }

        public bool Handle(string username)
        {
            bool isUsernameUnique = true;

            using (SqlConnection connection = _context.GetConnection())
            {
                connection.Open();
                string query = string.Format("SELECT * FROM [dbo].[Users] WHERE [username] = N'{0}'", username);
                SqlCommand cmd = new SqlCommand(query, connection);

                try
                {
                    using (var reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            isUsernameUnique = false;
                        }
                    }
                }
                catch (Exception ex)
                {
                    string e = ex.ToString();
                    return false;
                }
                finally
                {
                    connection.Close();
                }
            }

            return isUsernameUnique;
        }

    }
}

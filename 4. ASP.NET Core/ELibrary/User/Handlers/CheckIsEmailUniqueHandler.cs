using System;
using System.Data.SqlClient;

using User.Data;

namespace User.Handlers
{
    public class CheckIsEmailUniqueHandler
    {
        private readonly UserContext _context;

        public CheckIsEmailUniqueHandler(UserContext context)
        {
            _context = context;
        }

        public bool Handle(string email)
        {
            bool isEmailUnique = true;

            using (SqlConnection connection = _context.GetConnection())
            {
                connection.Open();
                string query = string.Format("SELECT * FROM [dbo].[Users] WHERE [email] = N'{0}'", email);
                SqlCommand cmd = new SqlCommand(query, connection);

                try
                {
                    using (var reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            isEmailUnique = false;
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

            return isEmailUnique;
        }

    }
}

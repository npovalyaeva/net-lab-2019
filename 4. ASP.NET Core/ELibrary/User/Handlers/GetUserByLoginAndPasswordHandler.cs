using System;
using System.Collections.Generic;

using System.Data.SqlClient;
using User.Commands;
using User.Data;

namespace User.Handlers
{
    public class GetUserByLoginAndPasswordHandler
    {
        private readonly UserContext _context;

        public GetUserByLoginAndPasswordHandler(UserContext context)
        {
            _context = context;
        }

        public List<Model.User> Handle(string login, string password)
        {
            List<Model.User> list = new List<Model.User>();

            using (SqlConnection connection = _context.GetConnection())
            {
                connection.Open();

                string query = string.Format("SELECT Users.user_id, Users.username, Users.email, Users.first_name, Users.last_name, Users.is_blocked, Roles.name " +
                    "FROM [dbo].[Users] AS Users " +
                    "JOIN [dbo].[Roles] AS Roles " +
                    "ON (Users.role_id = Roles.role_id) " +
                    "WHERE ([username] = N'{0}' OR [email] = N'{1}') AND [password_hash] = N'{2}'",
                    login, 
                    login,
                    Hash.FindHash(password)
                );
                SqlCommand cmd = new SqlCommand(query, connection);

                try
                {
                    using (var reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            list.Add(new Model.User()
                            {
                                Id = Convert.ToInt32(reader["user_id"]),
                                Username = reader["username"].ToString(),
                                Email = reader["email"].ToString(),
                                FirstName = reader["first_name"].ToString(),
                                LastName = reader["last_name"].ToString(),
                                IsBlocked = Convert.ToInt32(reader["is_blocked"]),
                                Role = reader["name"].ToString()
                            });
                        }
                    }
                }
                catch (Exception ex)
                {
                    string e = ex.ToString();
                    return null;
                }
                finally
                {
                    connection.Close();
                }
            }
            return list;
        }

    }
}

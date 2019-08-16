using Mapster;
using System.Data.SqlClient;
using User.Commands;
using User.Data;

namespace User.Handlers
{
    public class CreateUserHandler
    {
        private readonly UserContext _context;

        public CreateUserHandler(UserContext context)
        {
            _context = context;
        }

        public bool Handle(CreateUserCommand request)
        {
            var model = request.Adapt<Model.User>();
            string tempHash = Hash.FindHash(model.PasswordHash);
            model.PasswordHash = tempHash;

            using (SqlConnection connection = _context.GetConnection())
            {
                connection.Open();
                string query = string.Format("INSERT [dbo].[Users] ([username], [role_id], [email], [password_hash], [first_name], [last_name], [is_blocked]) VALUES (N'{0}', {1}, N'{2}', N'{3}', N'{4}', N'{5}', {6})",
                    model.Username, 
                    model.RoleId, 
                    model.Email,
                    model.PasswordHash, 
                    model.FirstName, 
                    model.LastName,
                    model.IsBlocked
                );
                SqlCommand cmd = new SqlCommand(query, connection);
                try
                {
                    cmd.ExecuteNonQuery();
                }
                catch
                {
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

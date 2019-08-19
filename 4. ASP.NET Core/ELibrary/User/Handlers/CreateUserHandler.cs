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
                string query = string.Format("SELECT * FROM [dbo].[Users] WHERE [username] = N'{0}' AND [password_hash] = N'{1}'",
                    model.Username,
                    model.Email,
                    model.PasswordHash, 
                    model.FirstName, 
                    model.LastName
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

using System.Data.SqlClient;
using Mapster;

using Author.Commands;
using Author.Data;
using System;

namespace Author.Handlers
{
    public class CreateAuthorHandler
    {
        private readonly AuthorContext _context;

        public CreateAuthorHandler(AuthorContext context)
        {
            _context = context;
        }

        public bool Handle(CreateAuthorCommand request)
        {
            var model = request.Adapt<Model.Author>();

            using (SqlConnection connection = _context.GetConnection())
            {
                connection.Open();
                string query = string.Format("INSERT [dbo].[Authors] ([last_name], [first_name], [patronymic]) VALUES (N'{0}', N'{1}', N'{2}')",
                    model.LastName,
                    model.FirstName,
                    model.Patronymic
                );

                SqlCommand cmd = new SqlCommand(query, connection);

                try
                {
                    cmd.ExecuteNonQuery();
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

            return true;
        }
    }
}

using Mapster;
using System.Data.SqlClient;
using Book.Commands;
using Book.Data;

namespace Book.Handlers
{
    public class CreateBookHandler
    {
        private readonly BookContext _context;

        public CreateBookHandler(BookContext context)
        {
            _context = context;
        }

        public bool Handle(CreateBookCommand request)
        {
            var model = request.Adapt<Model.Book>();

            using (SqlConnection connection = _context.GetConnection())
            {
                connection.Open();
                string query = string.Format("INSERT [dbo].[Books] ([title], [author_id], [year], [cover], [copies_count], [free_copies_count]) VALUES (N'{0}', {1}, {2}, NULL, {3}, {4})",
                    model.Title,
                    model.Author.Id,
                    model.Year,
                    //model.Cover,
                    model.CopiesCount,
                    model.CopiesCount
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

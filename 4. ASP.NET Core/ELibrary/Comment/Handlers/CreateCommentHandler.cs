using System.Data.SqlClient;

using Mapster;

using Comment.Commands;
using Comment.Data;

using System;

namespace Comment.Handlers
{
    public class CreateCommentHandler
    {
        private readonly CommentContext _context;

        public CreateCommentHandler(CommentContext context)
        {
            _context = context;
        }

        public bool Handle(CreateCommentCommand request)
        {
            var model = request.Adapt<Model.Comment>();

            using (SqlConnection connection = _context.GetConnection())
            {
                connection.Open();
                string query = string.Format("INSERT [dbo].[Comments] ([user_id], [book_id], [text], [date]) " +
                    "VALUES({0}, {1}, N'{2}', '{3}')",
                    model.User.Id,
                    model.Book.Id,
                    model.Text,
                    DateTime.Now
                ); ;
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

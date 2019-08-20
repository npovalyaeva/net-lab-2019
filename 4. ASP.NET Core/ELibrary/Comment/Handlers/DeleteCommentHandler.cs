using System;
using System.Data.SqlClient;

using Comment.Commands;
using Comment.Data;

namespace Comment.Handlers
{
    public class DeleteCommentHandler
    {
        private const string _text = "Deleted by Moderator";
        private readonly CommentContext _context;

        public DeleteCommentHandler(CommentContext context)
        {
            _context = context;
        }

        public bool Handle(int commentId)
        {

            using (SqlConnection connection = _context.GetConnection())
            {
                connection.Open();
                string query = string.Format("UPDATE [dbo].[Comments] SET [text] = N'{0}' " +
                    "WHERE [comment_id] = {1}",
                    _text,
                    commentId
                );
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

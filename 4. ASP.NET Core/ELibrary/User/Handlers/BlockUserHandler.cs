using System;

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

        public bool Handle(int userId, string blockedReason)
        {

            using (SqlConnection connection = _context.GetConnection())
            {
                connection.Open();
                string query = string.Format(
                    "UPDATE [dbo].[Users] " +
                    "SET [is_blocked] = 1, [blocked_reason] = N'{1}' " +
                    "WHERE [user_id] = {0} " +
                    "DECLARE @countOfRows INT " +
                    "SELECT @countOfRows = (SELECT COUNT(*) FROM [dbo].[Reservations] WHERE [user_id] = {0}) " +
                    "DECLARE @bookId INT " +
                    "DECLARE @freeCopiesCount INT " +
                    "WHILE (@countOfRows > 0) " +
                    "BEGIN; " +
                    "   SELECT @bookId = (SELECT TOP 1 [book_id] FROM [dbo].[Reservations] WHERE [user_id] = {0}) " +
                    "   SELECT @freeCopiesCount = (SELECT [free_copies_count] FROM [dbo].[Books] WHERE [book_id] = @bookId) " +
                    "   UPDATE [dbo].[Books] " +
                    "   SET [free_copies_count] = (@freeCopiesCount + 1) " +
                    "   WHERE [book_id] = @bookId " +
                    "   DELETE TOP (1) FROM [dbo].[Reservations] " +
                    "   WHERE [user_id] = {0} AND [book_id] = @bookId " +
                    "   SET @countOfRows = @countOfRows - 1 " +
                    "END;",
                    userId, 
                    blockedReason
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

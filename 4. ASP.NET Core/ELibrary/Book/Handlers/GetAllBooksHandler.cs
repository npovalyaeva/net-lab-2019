using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Text;

using Book.Data;

namespace Book.Handlers
{
    public class GetAllBooksHandler
    {
        private readonly BookContext _context;

        public GetAllBooksHandler(BookContext context)
        {
            _context = context;
        }

        public List<Model.Book> Handle()
        {
            List<Model.Book> list = new List<Model.Book>();

            using (SqlConnection connection = _context.GetConnection())
            {
                connection.Open();
                SqlCommand cmd = new SqlCommand("SELECT * FROM [dbo].[Books] AS Books " +
                    "JOIN [dbo].[Authors] AS Authors " +
                    "ON (Books.author_id = Authors.author_id)", connection);

                try
                {
                    using (var reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            Author.Model.Author author = new Author.Model.Author();
                            author.Id = Convert.ToInt32(reader["author_id"]);
                            author.LastName = reader["last_name"].ToString();
                            author.FirstName = reader["first_name"].ToString();
                            author.Patronymic = reader["patronymic"].ToString();

                            list.Add(new Model.Book()
                            {
                                Id = Convert.ToInt32(reader["book_id"]),
                                Title = reader["title"].ToString(),
                                Author = author,
                                Year = Convert.ToInt32(reader["year"]),
                                Cover = Array.ConvertAll<byte, byte?>(Encoding.ASCII.GetBytes(reader["cover"].ToString()), 
                                    delegate (byte b){
                                        return b;
                                    }
                                ),
                                CopiesCount = Convert.ToInt32(reader["copies_count"]),
                                FreeCopiesCount = Convert.ToInt32(reader["free_copies_count"])
                            });
                        }
                    }
                }
                catch
                {
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

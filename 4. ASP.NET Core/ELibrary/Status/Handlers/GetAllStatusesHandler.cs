using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Text;

using Status.Data;

namespace Status.Handlers
{
    public class GetAllStatusesHandler
    {
        private readonly StatusContext _context;

        public GetAllStatusesHandler(StatusContext context)
        {
            _context = context;
        }

        public List<Model.Status> Handle()
        {
            List<Model.Status> list = new List<Model.Status>();

            using (SqlConnection connection = _context.GetConnection())
            {
                connection.Open();
                SqlCommand cmd = new SqlCommand("SELECT * FROM [dbo].[Statuses]", connection);

                try
                {
                    using (var reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            list.Add(new Model.Status()
                            {
                                Id = Convert.ToInt32(reader["status_id"]),
                                Name = reader["name"].ToString()
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

using System;
using System.Collections.Generic;
using System.Text;

namespace Author.Commands
{
    public class CreateAuthorCommand
    {
        public int Id { get; set; }

        public string LastName { get; set; }

        public string FirstName { get; set; }

        public string Patronymic { get; set; }
    }
}

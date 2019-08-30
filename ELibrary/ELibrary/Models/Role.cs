using System;
using System.Collections.Generic;

namespace ELibrary.Models
{
    public partial class Role
    {
        public Role()
        {
            User = new HashSet<User>();
        }

        public byte RoleId { get; set; }
        public string Name { get; set; }

        public virtual ICollection<User> User { get; set; }
    }
}

using System;
using System.Collections.Generic;

namespace ELibrary.Models
{
    public partial class User
    {
        public User()
        {
            Comment = new HashSet<Comment>();
            Reservation = new HashSet<Reservation>();
        }

        public int UserId { get; set; }
        public string Username { get; set; }
        public byte RoleId { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public bool IsBlocked { get; set; }
        public string BlockedReason { get; set; }

        public virtual Role Role { get; set; }
        public virtual ICollection<Comment> Comment { get; set; }
        public virtual ICollection<Reservation> Reservation { get; set; }
    }
}

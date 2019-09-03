using ELibrary.Models.ViewModels.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ELibrary.Models.ViewModels.Comment
{
    public class CommentForBookModel
    {
        public int CommentId { get; set; }
        public UserNameModel User { get; set; }
        public string Text { get; set; }
        public DateTime Date { get; set; }
    }
}

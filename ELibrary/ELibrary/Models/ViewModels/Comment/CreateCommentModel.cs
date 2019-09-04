using ELibrary.Models.ViewModels.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ELibrary.Models.ViewModels.Comment
{
    public class CreateCommentModel
    {
        public int UserId { get; set; }
        public int BookId { get; set; }
        public string Text { get; set; }
    }
}

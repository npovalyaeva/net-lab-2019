﻿using Models.ViewModels.User;
using System;

namespace Models.ViewModels.Comment
{
    public class CommentForBookModel
    {
        public int CommentId { get; set; }
        public UserNameModel User { get; set; }
        public int BookId { get; set; }
        public string Text { get; set; }
        public DateTime Date { get; set; }
    }
}

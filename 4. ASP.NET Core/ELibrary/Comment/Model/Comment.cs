﻿using System;

namespace Comment.Model
{
    public class Comment
    {
        public int Id { get; set;  }

        public User.Model.User User { get; set; }

        public Book.Model.Book Book { get; set; }

        public string Text { get; set; }

        public DateTime DateOfComment { get; }
    }
}
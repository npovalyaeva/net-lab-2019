using AutoMapper;
using ELibrary.Models;
using ELibrary.Models.ViewModels.Author;
using ELibrary.Models.ViewModels.Book;
using ELibrary.Models.ViewModels.Comment;
using ELibrary.Models.ViewModels.User;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ELibrary
{
    public class MappingConfiguration
    {
        public MapperConfiguration Configure()
        {
            var config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile<MappingProfile>();
            });
            return config;
        }
    }

    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Author, AuthorModel>()
                .ReverseMap();
            CreateMap<Author, AuthorNameModel>()
                .ReverseMap();

            CreateMap<Book, BookBriefInfoModel>()
                .ForMember(dest => dest.AuthorName, opt => opt.MapFrom(src => src.Author))
                .ReverseMap();
            CreateMap<Book, BookFullInfoModel>()
                .ForMember(dest => dest.AuthorName, opt => opt.MapFrom(src => src.Author))               
                .ReverseMap();
            CreateMap<Book, CreateBookModel>()
                .ReverseMap();

            CreateMap<Comment, CommentForBookModel>()
                .ReverseMap();

            CreateMap<User, UserNameModel>()
                .ReverseMap();
        }
    }
}

using AutoMapper;
using ELibrary.Models;
using ELibrary.Models.ViewModels.Author;
using ELibrary.Models.ViewModels.Book;
using ELibrary.Models.ViewModels.Comment;
using ELibrary.Models.ViewModels.Reservation;
using ELibrary.Models.ViewModels.Status;
using ELibrary.Models.ViewModels.User;

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
            CreateMap<Author, CreateAuthorModel>()
                .ReverseMap();
            CreateMap<Author, SuccessAuthorModel>()
                .ReverseMap();

            CreateMap<Book, BookBriefInfoModel>()
                .ForMember(dest => dest.AuthorName, opt => opt.MapFrom(src => src.Author))
                .ReverseMap();
            CreateMap<Book, BookFullInfoModel>()
                .ForMember(dest => dest.AuthorName, opt => opt.MapFrom(src => src.Author))               
                .ReverseMap();
            CreateMap<Book, CreateBookModel>()
                .ReverseMap();
            CreateMap<Book, SuccessBookModel>()
                .ReverseMap();

            CreateMap<Comment, CommentForBookModel>()
                .ReverseMap();
            CreateMap<Comment, CreateCommentModel>()
                .ReverseMap();
            CreateMap<Comment, SuccessCommentModel>()
                .ReverseMap();

            CreateMap<Reservation, CreateReservationModel>()
                .ReverseMap();
            CreateMap<Reservation, EditReservationModel>()
                .ReverseMap();
            CreateMap<Reservation, ReservationModel>()
                .ReverseMap();
            CreateMap<Reservation, SuccessfulReservationModel>()
                .ReverseMap();
            CreateMap<Reservation, SuccessfulRemovalModel>()
                .ReverseMap();

            CreateMap<Status, StatusModel>()
                .ReverseMap();

            CreateMap<User, BlockUserModel>()
                .ReverseMap();
            CreateMap<User, CreateUserModel>()
                .ReverseMap();
            CreateMap<User, SuccessUserModel>()
                .ReverseMap();
            CreateMap<User, UserBlockingStatusModel>()
                .ReverseMap();
            CreateMap<User, UserModel>()
                .ReverseMap();
            CreateMap<User, UserNameModel>()
                .ReverseMap();
        }
    }
}
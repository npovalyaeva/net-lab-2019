using AutoMapper;
using ELibrary.Models;
using ELibrary.Models.ViewModels.Author;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ELibrary
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            //CreateMap<List<AuthorModel>, List<AuthorModel>>().ReverseMap();
            CreateMap<Author, AuthorModel>().ReverseMap();
        }
    }

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
}

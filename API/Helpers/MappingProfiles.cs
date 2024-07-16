using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using AutoMapper.Extensions.Microsoft.DependencyInjection;

namespace API.Helpers
{
    public class MappingProfiles : Profile 
    {
        public MappingProfiles()
        {
            CreateMap<Product, ProductToReturnDto>();
        }
    }
}
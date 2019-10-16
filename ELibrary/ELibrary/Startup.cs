using AutoMapper;
using DataLayer;
using DataLayer.Entities;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Services.Interfaces;
using Services.JwtProvider;
using Services.Repositories;
using Services.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;

namespace ELibrary
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //services.Configure<CookiePolicyOptions>(options =>
            //{
            //    // This lambda determines whether user consent for non-essential cookies is needed for a given request.
            //    options.CheckConsentNeeded = context => true;
            //    options.MinimumSameSitePolicy = SameSiteMode.None;
            //});

            services.AddDbContext<ELibraryContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("ELibraryDatabase")));

            services.AddScoped<IRepository<Author>, AuthorRepository>();
            services.AddScoped<IRepository<Book>, BookRepository>();
            services.AddScoped<IRepository<Comment>, CommentRepository>();
            services.AddScoped<IRepository<Reservation>, ReservationRepository>();
            services.AddScoped<IRepository<Status>, StatusRepository>();
            services.AddScoped<IRepository<User>, UserRepository>();

            services.AddScoped<IAuthorService, AuthorService>();
            services.AddScoped<IBookService, BookService>();
            services.AddScoped<ICommentService, CommentService>();
            services.AddScoped<IReservationService, ReservationService>();
            services.AddScoped<IStatusService, StatusService>();
            services.AddScoped<IUserService, UserService>();

            var key = Encoding.ASCII.GetBytes(Configuration["secretKey"]);
            var validationParameters = new TokenValidationParameters
            {
                ClockSkew = TimeSpan.Zero,

                ValidateAudience = true,
                ValidAudience = Configuration["Jwt:audience"],

                ValidAudiences = new[] { Configuration["Jwt:audience"] },
                AudienceValidator = (IEnumerable<string> audiences, SecurityToken securityToken, TokenValidationParameters vp) =>
                    audiences.Any(a => a == vp.ValidAudience),

                ValidateIssuer = true,
                ValidIssuer = Configuration["Jwt:issuer"],

                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuerSigningKey = true,

                RequireExpirationTime = true,
                ValidateLifetime = true
            };

            var hostingEnvironment = services.BuildServiceProvider().GetService<IHostingEnvironment>();
            services.AddDataProtection(options =>
                options.ApplicationDiscriminator = hostingEnvironment.ApplicationName)
           .SetApplicationName(hostingEnvironment.ApplicationName);

            services.AddScoped<IJwtGenerator, JwtGenerator>(serviceProvider =>
                new JwtGenerator(new JwtOptions(validationParameters,
                                                Configuration["Jwt:tokenName"]))
            );

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultSignInScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, options =>
            {
                options.SaveToken = true;
                options.TokenValidationParameters = validationParameters;
            });
            services.AddAuthorization(options =>
            {
                options.AddPolicy("AdminOnly", policy =>
                                  policy.RequireClaim(ClaimTypes.Role, "Administrator"));
            });


            services.AddAutoMapper(GetType().Assembly); // ?
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                //app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.Use((context, next) =>
            {
                context.Response.Headers["Access-Control-Allow-Origin"] = "*";
                context.Response.Headers["Access-Control-Allow-Methods"] = "GET, PUT, POST, DELETE";
                context.Response.Headers["Access-Control-Allow-Headers"] = "Content-Type, Accept";
                return next.Invoke();
            });

            app.UseHttpsRedirection();
            //app.UseStaticFiles();
            //app.UseCookiePolicy();
            app.UseAuthentication();

            app.UseMvc();
            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}

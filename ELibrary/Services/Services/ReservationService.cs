using AutoMapper;
using DataLayer;
using DataLayer.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Models.ViewModels.Reservation;
using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Services.Services
{
    public class ReservationService : IReservationService
    {
        private readonly ELibraryContext _context;
        private readonly IMapper _mapper;
        private readonly ILogger<ReservationService> _logger;

        public ReservationService(ELibraryContext context)
        {
            _context = context;

            var config = new MappingConfiguration().Configure();
            _mapper = config.CreateMapper();
        }

        public async Task<List<ReservationModel>> GetReservations()
        {
            try
            {
                List<Reservation> reservations = await _context.Reservation
                    .Include(r => r.Book)
                    .Include(r => r.Status)
                    .Include(r => r.User)
                    .ToListAsync();

                if (reservations == null)
                {
                    return null;
                }
                return _mapper.Map<List<Reservation>, List<ReservationModel>>(reservations);
            }
            catch
            {
                return null;
            }
        }

        public async Task<List<ReservationModel>> GetReservationsByBookId(int bookId)
        {
            try
            {
                List<Reservation> reservations = await _context.Reservation
                    .Include(r => r.Book)
                    .Include(r => r.Status)
                    .Include(r => r.User)
                    .Where(m => m.BookId == bookId)
                    .ToListAsync();

                if (reservations == null)
                {
                    return null;
                }
                return _mapper.Map<List<Reservation>, List<ReservationModel>>(reservations);
            }
            catch
            {
                return null;
            }
        }

        public async Task<List<ReservationModel>> GetReservationsByUserId(int userId)
        {
            try
            {
                List<Reservation> reservations = await _context.Reservation
                    .Include(r => r.Book)
                    .Include(r => r.Status)
                    .Include(r => r.User)
                    .Where(m => m.UserId == userId)
                    .ToListAsync();

                if (reservations == null)
                {
                    return null;
                }
                return _mapper.Map<List<Reservation>, List<ReservationModel>>(reservations);
            }
            catch
            {
                return null;
            }
        }

        public async Task<List<ReservationModel>> GetHandedOutReservations()
        {
            try
            {
                List<Reservation> reservations = await _context.Reservation
                    .Include(r => r.Book)
                    .Include(r => r.Status)
                    .Include(r => r.User)
                    .Where(m => m.StatusId == 2)
                    .ToListAsync();

                if (reservations == null)
                {
                    return null;
                }
                return _mapper.Map<List<Reservation>, List<ReservationModel>>(reservations);
            }
            catch
            {
                return null;
            }
        }

        public async Task<List<ReservationModel>> GetHandedOutReservationsByAuthorName(string lastName)
        {
            if (string.IsNullOrEmpty(lastName))
            {
                return null;
            }

            try
            {
                List<Reservation> reservations = await _context.Reservation
                    .Include(r => r.Book)
                    .Include(r => r.Status)
                    .Include(r => r.User)
                    .Where(m => m.StatusId == 2)
                    .Where(m => m.Book.Author.LastName == lastName)
                    .ToListAsync();

                if (reservations == null)
                {
                    return null;
                }
                return _mapper.Map<List<Reservation>, List<ReservationModel>>(reservations);
            }
            catch
            {
                return null;
            }
        }

        public async Task<List<ReservationModel>> GetHandedOutReservationsByCountOfDays(int count)
        {
            try
            {
                List<Reservation> reservations = await _context.Reservation
                    .Include(r => r.Book)
                    .Include(r => r.Status)
                    .Include(r => r.User)
                    .Where(m => m.StatusId == 2)
                    .Where(m => m.DateOfReservation <= DateTime.Now.AddDays(Convert.ToDouble(-count)))
                    .ToListAsync();

                if (reservations == null)
                {
                    return null;
                }
                return _mapper.Map<List<Reservation>, List<ReservationModel>>(reservations);
            }
            catch
            {
                return null;
            }
        }

        public async Task<List<ReservationModel>> GetHandedOutReservationsByTitle(string title)
        {
            if (string.IsNullOrEmpty(title))
            {
                return null;
            }

            try
            {
                List<Reservation> reservations = await _context.Reservation
                    .Include(r => r.Book)
                    .Include(r => r.Status)
                    .Include(r => r.User)
                    .Where(m => m.StatusId == 2)
                    .Where(m => m.Book.Title == title)
                    .ToListAsync();

                if (reservations == null)
                {
                    return null;
                }
                return _mapper.Map<List<Reservation>, List<ReservationModel>>(reservations);
            }
            catch
            {
                return null;
            }
        }

        public async Task<ReservationModel> GetReservationInfo(long id)
        {
            try
            {
                Reservation reservation = await _context.Reservation
                    .Include(c => c.Book)
                    .Include(c => c.Status)
                    .Include(c => c.User)
                    .FirstOrDefaultAsync(m => m.ReservationId == id);

                if (reservation == null)
                {
                    return null;
                }
                return _mapper.Map<Reservation, ReservationModel>(reservation);
            }
            catch
            {
                return null;
            }
        }

        public async Task<SuccessfulReservationModel> Create(CreateReservationModel reservation)
        {
            if (reservation == null)
            {
                return null;
            }

            try
            {
                Reservation dbObject = _mapper.Map<CreateReservationModel, Reservation>(reservation);

                Book dbBookObject = await _context.Book
                .FirstOrDefaultAsync(m => m.BookId == reservation.BookId);

                dbBookObject.FreeCopiesCount--;
                dbObject.DateOfReservation = DateTime.Now;

                _context.Reservation.Add(dbObject);
                _context.Book.Update(dbBookObject);
                await _context.SaveChangesAsync();

                _logger.LogInformation(string.Format("New copy was added to the 'Reservations' table. Reservation ID: {0}, Book: {1}, User ID: {2}, Status ID: {3}", dbObject.ReservationId, dbBookObject.Title, dbObject.UserId, dbObject.StatusId));
                return _mapper.Map<Reservation, SuccessfulReservationModel>(dbObject);
            }
            catch
            {
                return null;
            }
        }

        public async Task<SuccessfulReservationModel> Edit(EditReservationModel reservation)
        {
            if (reservation == null)
            {
                return null;
            }

            try
            {
                Reservation dbObject = await _context.Reservation
                    .FirstOrDefaultAsync(m => m.ReservationId == reservation.ReservationId);
                if (dbObject == null)
                {
                    return null;
                }
                dbObject.StatusId = reservation.StatusId;
                dbObject.DateOfReservation = DateTime.Now;

                _context.Reservation.Update(dbObject);
                await _context.SaveChangesAsync();
                _logger.LogInformation(string.Format("Reservation was updated. Reservation ID: {0}, Status ID: {1}", dbObject.ReservationId, dbObject.StatusId));
                return _mapper.Map<Reservation, SuccessfulReservationModel>(dbObject);
            }
            catch
            {
                return null;
            }
        }

        public async Task<bool> Delete(long id)
        {
            try
            {
                Reservation reservation = await _context.Reservation
                    .FindAsync(id);
                if (reservation == null)
                {
                    return false;
                }

                Book book = await _context.Book
                    .FirstOrDefaultAsync(m => m.BookId == reservation.BookId);
                book.FreeCopiesCount++;
                _context.Book.Update(book);
                _context.Reservation.Remove(reservation);
                await _context.SaveChangesAsync();

                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}

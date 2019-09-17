using DataLayer.Entities;
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
        
        private readonly ILogger<ReservationService> _logger;
        private readonly IRepository<Book> _bookRepository;
        private readonly IRepository<Reservation> _reservationRepository;

        public ReservationService(IRepository<Book> bookRepository, IRepository<Reservation> reservationRepository)
        {
            _bookRepository = bookRepository;
            _reservationRepository = reservationRepository;
        }

        public async Task<List<Reservation>> GetReservations()
        {
            try
            {
                var reservations = await _reservationRepository.GetAll();
                if (reservations == null)
                {
                    return null;
                }
                return reservations;
            }
            catch
            {
                return null;
            }
        }

        public async Task<List<Reservation>> GetReservationsByBookId(int bookId)
        {
            try
            {
                var dbList = await _reservationRepository.GetAll();
                var reservations = dbList.Where(m => m.BookId == bookId);
                if (reservations == null)
                {
                    return null;
                }
                return reservations.ToList();
            }
            catch
            {
                return null;
            }
        }

        public async Task<List<Reservation>> GetReservationsByUserId(int userId)
        {
            try
            {
                var dbList = await _reservationRepository.GetAll();
                var reservations = dbList.Where(m => m.UserId == userId);
                if (reservations == null)
                {
                    return null;
                }
                return reservations.ToList();
            }
            catch
            {
                return null;
            }
        }

        public async Task<List<Reservation>> GetHandedOutReservations()
        {
            try
            {
                var dbList = await _reservationRepository.GetAll();
                var reservations = dbList.Where(m => m.StatusId == 2);
                if (reservations == null)
                {
                    return null;
                }
                return reservations.ToList();
            }
            catch
            {
                return null;
            }
        }

        public async Task<List<Reservation>> GetHandedOutReservationsByAuthorName(string lastName)
        {
            if (string.IsNullOrEmpty(lastName))
            {
                return null;
            }

            try
            {
                var dbList = await _reservationRepository.GetAll();
                var reservations = dbList
                    .Where(m => m.StatusId == 2)
                    .Where(m => m.Book.Author.LastName.ToLower() == lastName.ToLower());
                if (reservations == null)
                {
                    return null;
                }
                return reservations.ToList();
            }
            catch
            {
                return null;
            }
        }

        public async Task<List<Reservation>> GetHandedOutReservationsByCountOfDays(int count)
        {
            try
            {
                var dbList = await _reservationRepository.GetAll();
                var reservations = dbList
                    .Where(m => m.StatusId == 2)
                    .Where(m => m.DateOfReservation <= DateTime.Now.AddDays(Convert.ToDouble(-count)));
                if (reservations == null)
                {
                    return null;
                }
                return reservations.ToList();
            }
            catch
            {
                return null;
            }
        }

        public async Task<List<Reservation>> GetHandedOutReservationsByTitle(string title)
        {
            if (string.IsNullOrEmpty(title))
            {
                return null;
            }

            try
            {
                var dbList = await _reservationRepository.GetAll();
                var reservations = dbList
                    .Where(m => m.StatusId == 2)
                    .Where(m => m.Book.Title.ToLower() == title.ToLower());
                if (reservations == null)
                {
                    return null;
                }
                return reservations.ToList();
            }
            catch
            {
                return null;
            }
        }

        public async Task<Reservation> GetReservationInfo(long id)
        {
            try
            {
                Reservation reservation = await _reservationRepository.Get(id);
                if (reservation == null)
                {
                    return null;
                }
                return reservation;
            }
            catch
            {
                return null;
            }
        }

        public async Task<Reservation> Create(Reservation reservation)
        {
            if (reservation == null)
            {
                return null;
            }

            try
            {
                Book dbBookObject = await _bookRepository.Get(reservation.BookId);
                dbBookObject.FreeCopiesCount--;
                reservation.DateOfReservation = DateTime.Now;

                await _reservationRepository.Create(reservation);
                await _bookRepository.Update(dbBookObject);

                _logger.LogInformation(string.Format("New copy was added to the 'Reservations' table. Reservation ID: {0}, Book: {1}, User ID: {2}, Status ID: {3}", reservation.ReservationId, dbBookObject.Title, reservation.UserId, reservation.StatusId));
                return reservation;
            }
            catch
            {
                _logger.LogInformation(string.Format("Error: Reservation wasn't added. Book ID: {0}, User ID: {1}", reservation.BookId, reservation.UserId));
                return null;
            }
        }

        public async Task<Reservation> Edit(EditReservationModel reservation)
        {
            if (reservation == null)
            {
                return null;
            }

            try
            {
                Reservation dbObject = await _reservationRepository.Get(reservation.ReservationId);
                if (dbObject == null)
                {
                    return null;
                }
                dbObject.StatusId = reservation.StatusId;
                dbObject.DateOfReservation = DateTime.Now;

                await _reservationRepository.Update(dbObject);
                _logger.LogInformation(string.Format("Reservation was updated. Reservation ID: {0}, Status ID: {1}", dbObject.ReservationId, dbObject.StatusId));
                return dbObject;
            }
            catch
            {
                _logger.LogInformation(string.Format("Error: Reservation wasn't updated. Reservation ID: {0}", reservation.ReservationId));
                return null;
            }
        }

        public async Task<bool> Delete(long id)
        {
            try
            {
                var reservation = await _reservationRepository.Get(id);
                if (reservation == null)
                {
                    return false;
                }
                var book = await _bookRepository.Get(reservation.BookId);
                book.FreeCopiesCount++;
                await _bookRepository.Update(book);
                await _reservationRepository.Delete(reservation);
                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}

using DataLayer.Entities;
using Microsoft.Extensions.Logging;
using Models.ViewModels.Reservation;
using Services.Filters;
using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Services.Services
{
    public class ReservationService : IReservationService
    {
        // TODO: Check
        private readonly ILogger<ReservationService> _logger;
        private readonly IRepository<Book> _bookRepository;
        private readonly IRepository<Reservation> _reservationRepository;

        public ReservationService(IRepository<Book> bookRepository, IRepository<Reservation> reservationRepository, ILogger<ReservationService> logger)
        {
            _bookRepository = bookRepository;
            _reservationRepository = reservationRepository;
            _logger = logger;
        }

        public async Task<List<Reservation>> GetReservations()
        {
            try
            {
                var entityList = _reservationRepository.GetAll();
                return entityList.ToList();
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
                var entityList = _reservationRepository.GetAll();
                var reservations = ReservationFilter.FilterByBookId(entityList, bookId);
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
                var entityList = _reservationRepository.GetAll();
                var reservations = ReservationFilter.FilterByUserId(entityList, userId);
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
                var entityList = _reservationRepository.GetAll();
                var reservations = ReservationFilter.FilterByStatusId(entityList, 2);
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
                var entityList = _reservationRepository.GetAll();
                var reservations = ReservationFilter.FilterByStatusIdAndAuthorName(entityList, 2, lastName);
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
                var entityList = _reservationRepository.GetAll();
                var reservations = ReservationFilter.FilterByStatusIdAndCountOfDays(entityList, 2, count);
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
                var entityList = _reservationRepository.GetAll();
                var reservations = ReservationFilter.FilterByStatusIdAndTitle(entityList, 2, title);
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

                _logger.LogInformation(string.Format("New copy was added to the 'Reservations' table. Reservation ID: {0}, User ID: {1}, Status ID: {2}", reservation.ReservationId, reservation.UserId, reservation.StatusId));
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

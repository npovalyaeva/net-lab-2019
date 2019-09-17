using DataLayer.Entities;
using Models.ViewModels.Reservation;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Services.Interfaces
{
    public interface IReservationService
    {
        Task<List<Reservation>> GetReservations();
        Task<List<Reservation>> GetReservationsByBookId(int bookId);
        Task<List<Reservation>> GetReservationsByUserId(int userId);
        Task<List<Reservation>> GetHandedOutReservations();
        Task<List<Reservation>> GetHandedOutReservationsByAuthorName(string lastName);
        Task<List<Reservation>> GetHandedOutReservationsByCountOfDays(int count);
        Task<List<Reservation>> GetHandedOutReservationsByTitle(string title);
        Task<Reservation> GetReservationInfo(long id);

        Task<Reservation> Create(Reservation reservation);

        Task<Reservation> Edit(EditReservationModel reservation);

        Task<bool> Delete(long id);
    }
}

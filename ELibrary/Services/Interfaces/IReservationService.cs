using Models.ViewModels.Reservation;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Services.Interfaces
{
    public interface IReservationService
    {
        Task<List<ReservationModel>> GetReservations();
        Task<List<ReservationModel>> GetReservationsByBookId(int bookId);
        Task<List<ReservationModel>> GetReservationsByUserId(int userId);
        Task<List<ReservationModel>> GetHandedOutReservations();
        Task<List<ReservationModel>> GetHandedOutReservationsByAuthorName(string lastName);
        Task<List<ReservationModel>> GetHandedOutReservationsByCountOfDays(int count);
        Task<List<ReservationModel>> GetHandedOutReservationsByTitle(string title);
        Task<ReservationModel> GetReservationInfo(long id);

        Task<SuccessfulReservationModel> Create(CreateReservationModel reservation);

        Task<SuccessfulReservationModel> Edit(EditReservationModel reservation);

        Task<bool> Delete(long id);
    }
}

using DataLayer.Entities;
using System;
using System.Linq;

namespace Services.Filters
{
    public static class ReservationFilter
    {
        public static IQueryable<Reservation> FilterByBookId(IQueryable<Reservation> list, int bookId)
        {
            return list.Where(m => m.BookId == bookId);
        }

        public static  IQueryable<Reservation> FilterByUserId(IQueryable<Reservation> list, int userId)
        {
            return list.Where(m => m.UserId == userId);
        }

        public static  IQueryable<Reservation> FilterByStatusId(IQueryable<Reservation> list, int statusId)
        {
            return list.Where(m => m.StatusId == statusId);
        }

        public static  IQueryable<Reservation> GetHandedOutReservationsByAuthorName(IQueryable<Reservation> list, int statusId, string lastName)
        {
            return string.IsNullOrEmpty(lastName) ? list :
                list
                .Where(m => m.StatusId == statusId)
                .Where(m => m.Book.Author.LastName.ToLower() == lastName.ToLower());
        }

        public static  IQueryable<Reservation> FilterByStatusIdAndCountOfDays(IQueryable<Reservation> list, int statusId, int count)
        {
            return list
                .Where(m => m.StatusId == statusId)
                .Where(m => m.DateOfReservation <= DateTime.Now.AddDays(Convert.ToDouble(-count)));
        }

        public static  IQueryable<Reservation> GetHandedOutReservationsByTitle(IQueryable<Reservation> list, int statusId, string title)
        {
            return string.IsNullOrEmpty(title) ? list :
                list
                .Where(m => m.StatusId == statusId)
                .Where(m => m.Book.Title.ToLower() == title.ToLower());
        }
    }
}

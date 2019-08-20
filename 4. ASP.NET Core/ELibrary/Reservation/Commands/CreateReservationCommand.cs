namespace Reservation.Commands
{
    public class CreateReservationCommand
    {
        public int Id { get; set; }

        public Status.Model.Status Status { get; set; }

        public Book.Model.Book Book { get; set; }

        public User.Model.User User { get; set; }

        public string DateOfReservation { get; }
    }
}
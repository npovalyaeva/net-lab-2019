namespace Models.ViewModels.Reservation
{
    public class CreateReservationModel
    {
        public byte StatusId { get; set; }
        public int BookId { get; set; }
        public int UserId { get; set; }
    }
}

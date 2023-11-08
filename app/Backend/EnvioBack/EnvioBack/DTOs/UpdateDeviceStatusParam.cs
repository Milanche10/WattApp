namespace EnvioBack.DTOs
{
    public class UpdateDeviceStatusParam
    {
        private int id;
        private bool status;

        public int Id { get => id; set => id = value; }
        public bool Status { get => status; set => status = value; }
    }
}

namespace EnvioBack.DTOs
{
    public class UpdateDeviceVisibilityParam
    {
        private int id;
        private bool visibility;

        public int Id { get => id; set => id = value; }
        public bool Visibility { get => visibility; set => visibility = value; }
    }
}

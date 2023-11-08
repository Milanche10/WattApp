namespace EnvioBack.DTOs
{
    public class UpdateDeviceAccesabilityParam
    {
        private int id;
        private bool accesability;

        public int Id { get => id; set => id = value; }
        public bool Accesability { get => accesability; set => accesability = value; }
    }
}

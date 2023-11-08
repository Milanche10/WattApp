namespace EnvioBack.DTOs
{
    public class DevicePagingDTO
    {
        public List<DeviceDTO> Devices { get; set; } = new List<DeviceDTO>();
        public int NumberOfPages { get; set; }
        public int CurrentPage { get; set; }
    }
}

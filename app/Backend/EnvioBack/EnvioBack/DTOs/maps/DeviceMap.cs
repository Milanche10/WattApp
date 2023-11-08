namespace EnvioBack.DTOs.maps
{
    public class DeviceMap
    {
        public int Id { get; set; }
        public string Type { get;set; }
        public double Usage { get; set; }
        public double Produced { get;set; }

        public DeviceMap(int id, string type, double usage, double produced)
        {
            this.Id = id;
            this.Type = type;
            this.Usage = usage;
            this.Produced = produced;
        }

    }
}

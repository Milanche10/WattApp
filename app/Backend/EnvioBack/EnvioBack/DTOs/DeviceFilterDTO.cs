namespace EnvioBack.DTOs
{
    public class DeviceFilterDTO
    {
        private int page;
        private int prosummerId;
        private string searchBarText;
        //private bool status;
        private string type;
        private string countySearch;
        private string citySearch;

        public int Page { get => page; set => page = value; }
        public string SearchBarText { get => searchBarText; set => searchBarText = value; }
        //public bool Status { get => status; set => status = value; }
        public string Type { get => type; set => type = value; }
        public string CountySearch { get => countySearch; set => countySearch = value; }
        public string CitySearch { get => citySearch; set => citySearch = value; }
        public int ProsummerId { get => prosummerId; set => prosummerId = value; }
    }
}

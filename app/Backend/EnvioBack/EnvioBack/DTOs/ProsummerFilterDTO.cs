namespace EnvioBack.DTOs
{
    public class ProsummerFilterDTO
    {
        private int page;
        private string searchBarText;
        private string jbmgSearch;
        private string brLkSearch;
        private string countySearch;
        private string citySearch;

        public string SearchBarText { get => searchBarText; set => searchBarText = value; }
        public string JbmgSearch { get => jbmgSearch; set => jbmgSearch = value; }
        public string BrLkSearch { get => brLkSearch; set => brLkSearch = value; }
        public string CountySearch { get => countySearch; set => countySearch = value; }
        public string CitySearch { get => citySearch; set => citySearch = value; }
        public int Page { get => page; set => page = value; }
    }
}

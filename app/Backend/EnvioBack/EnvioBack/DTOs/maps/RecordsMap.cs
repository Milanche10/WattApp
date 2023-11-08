using EnvioBack.Entities;

namespace EnvioBack.DTOs.maps
{
    public class RecordsMap
    {
        public string date { get; set; }

        public List<RecordDTO> records { get; set; }

        public RecordsMap(string month, string year, List<Records> list) {
            this.date = month + "/" + year;

            List<RecordDTO> recordDTOs= new List<RecordDTO>();
            foreach (var record in list)
            {
                recordDTOs.Add(new RecordDTO(record));
            }
            this.records = recordDTOs;
        }
    }
}

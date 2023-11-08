using EnvioBack.Entities;

namespace EnvioBack.DTOs
{
    public class RecordDTO
    {
        public string day { get; set; }
        public string hour { get; set; }
        public double usage { get; set; }

        public double produced { get; set; }    

        public RecordDTO(Records record)
        {
            this.day = record.date.Day.ToString();
            this.hour = record.date.Hour.ToString();
            this.usage = record.Usage;
            this.produced = record.Produced;
        }
    }
}

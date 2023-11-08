using EnvioBack.Entities;

namespace EnvioBack.DTOs
{
    public class PredictionDTO
    {
        public string day { get; set; }
        public string hour { get;set; }
        public double usage { get; set; }

        public double produced { get; set; }

        public PredictionDTO(Predictions predictions) 
        {
            this.day = predictions.date.Day.ToString();
            this.hour = predictions.date.Hour.ToString();
            this.usage = predictions.UsagePrediction;
            this.produced = predictions.ProducedPrediction;
        }
    }
}

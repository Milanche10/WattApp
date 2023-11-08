using EnvioBack.Entities;
using System.Collections.Generic;

namespace EnvioBack.DTOs.maps
{
    public class PredictionsMap
    {
        public string date { get; set; }

        public List<PredictionDTO> predictions{ get; set; }

        public PredictionsMap(string month,string year, List<Predictions> predictions) 
        {
            this.date = month + "/" + year;
            List<PredictionDTO> predictionDTOs = new List<PredictionDTO>();
            foreach (var prediction in predictions)
            {
                predictionDTOs.Add(new PredictionDTO(prediction));
            }
            this.predictions = predictionDTOs;
        }
    }
}

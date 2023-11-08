using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EnvioBack.Entities
{
    public class Predictions
    {
        [Key]
        private int id;

        private double usagePrediction;
        private double producedPrediction;
        [ForeignKey("DeviceId")]
        private int deviceId;
        private Devices device { get; set; }
        [Column(TypeName = "Date")]
        public DateTime date { get; set; }
        private bool isTransfered;


        public int Id { get => id; set => id = value; }
        public double UsagePrediction { get => usagePrediction; set => usagePrediction = value; }
        public double ProducedPrediction { get => producedPrediction; set => producedPrediction = value; }
        public int DeviceId { get => deviceId; set => deviceId = value; }
        public Devices Device { get => device; set => device = value; }
        public bool IsTransfered { get => isTransfered; set => isTransfered = value; }
    }
}

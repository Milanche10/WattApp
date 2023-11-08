using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace EnvioBack.Entities
{
    public class Records
    {
        [Key]
        private int id;
        private double usage;
        private double produced;
        [ForeignKey("DeviceId")]
        private int deviceId;
        private Devices device { get; set; }

        [Column(TypeName = "Date")]
        public DateTime date { get; set; }

        public int Id { get => id; set => id = value; }
        public double Usage { get => usage; set => usage = value; }
        public int DeviceId { get => deviceId; set => deviceId = value; }
        public Devices Device { get => device; set => device = value; }
        public double Produced { get => produced; set => produced = value; }
    }
}

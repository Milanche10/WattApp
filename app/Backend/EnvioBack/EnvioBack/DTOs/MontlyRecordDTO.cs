using System.Transactions;

namespace EnvioBack.DTOs
{
    public class MontlyRecordDTO
    {
        public string deviceName { get; set; }
        public int month { get; set; }
        public double usageSum { get; set; }

        public MontlyRecordDTO(string deviceName, int month, double usageSum)
        {
            this.deviceName = deviceName;
            this.month = month;
            this.usageSum = usageSum;
        }
    }
}

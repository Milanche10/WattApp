namespace EnvioBack.DTOs
{
    public class SmtpSettings
    {
        public string Host { get; set; }
        public int Port { get; set; }
        public string FromEmail { get; set; }
        public string FromName { get; set; }
        public int Timeout { get; set; }
        public bool EnableSsl { get; set; }
    }
}

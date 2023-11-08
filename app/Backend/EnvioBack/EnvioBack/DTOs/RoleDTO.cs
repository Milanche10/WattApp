namespace EnvioBack.DTOs
{
    public class RoleDTO
    {
        public RoleENUM role { get; set; }
        public int isBlock { get; set; } = -1;
        public int isFirstTimeLogged { get; set; } = -1;
    }
}

using EnvioBack.DTOs;
using EnvioBack.Entities;
using EnvioBack.Repository;
using EnvioBack.Repository.interfaces;
using EnvioBack.Services.interfaces;
using EnvioBack.Utils;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace EnvioBack.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IAdresseRepository _adresseRepository;
        private readonly IConfiguration _configuration;
        private readonly IProsummerRepository _prosummerRepository;
        private readonly IRealEstateRepository _realEstateRepository;
        public UserService(IUserRepository userRepository, IAdresseRepository adresseRepository, IConfiguration configuration, IProsummerRepository prosummerRepository = null, IRealEstateRepository realEstateRepository=null)
        {
            _userRepository = userRepository;
            _configuration = configuration;
            _adresseRepository = adresseRepository;
            _prosummerRepository = prosummerRepository;
            _realEstateRepository = realEstateRepository;
        }
        public async Task<UserDTO> getById(int userId)
        {
            User user = _userRepository.getById(userId);
            return new UserDTO(user);
        }

        public async Task<TokenDTO> RegisterUser(UserRegistrationDTO registration)
        {
            var userWithSameEmail = await _userRepository.getByEmail(registration.Email);
            if (userWithSameEmail != null) {
                throw new Exception("User with email: " + registration.Email + " already exist."); 
            }

            if(registration.admin && registration.adminPass != _configuration.GetSection("AppSettings:ADMINPASS").Value)
            {
                throw new Exception("Wrong admin password");
            }

            var user = new User();

            CreatePasswordHash(registration.Password, out byte[] passwordHash, out byte[] passwordSalt);

            user.FirstName = registration.FirstName;
            user.LastName = registration.LastName;
            user.Email = registration.Email;

            _userRepository.Insert(user);

            UserPass userPass= new UserPass();
            userPass.UserId = user.Id;
            userPass.PasswordHash = passwordHash;
            userPass.PasswordSalt = passwordSalt;
            userPass.User = user;

            _userRepository.InsertPass(userPass);

            if (registration.admin)
            {
                Admin admin = new Admin();
                admin.UserId = user.Id;
                admin.User = user;
                _userRepository.InsertAdmin(admin);
            } else if (!registration.admin) {
                Prosummer prosummer = new Prosummer();
                prosummer.BrLK = registration.BrLk;
                prosummer.Jbmg = registration.Jbmg;
                prosummer.UserId = user.Id;
                prosummer.User = user;
                Adresses adress = new Adresses();
                adress.Address = " ";
                adress.City = " ";
                adress.County = " ";
                prosummer.Adresse = adress;
                RealEstate realEstate = new RealEstate();
                realEstate.Adresse = adress;
                realEstate.Type = " ";


                _adresseRepository.insert(adress);
                Prosummer newProsummer = _userRepository.returnInsertProsummer(prosummer);
                realEstate.Prosummer = newProsummer;
                _realEstateRepository.insertRealEstate(realEstate);
            }

            TokenDTO token = new TokenDTO();
            token.Token = CreateToken(user);
            token.user = AESEncryptor.EncryptStringAES(Convert.ToString(user.Id));

            return token;

        }
        public async Task<NumberOfPagesDTO> RegisterProsummer(ProsummerRegistartionDTO registration)
        {
            var userWithSameEmail = await _userRepository.getByEmail(registration.Email);
            if (userWithSameEmail != null)
            {
                throw new Exception("User with email: " + registration.Email + " already exist.");
            }

            var password = registration.FirstName.ToLower().Trim() + registration.LastName.ToLower().Trim();

            var user = new User();

            CreatePasswordHash(password, out byte[] passwordHash, out byte[] passwordSalt);

            user.FirstName = registration.FirstName;
            user.LastName = registration.LastName;
            user.Email = registration.Email;

            _userRepository.Insert(user);

            UserPass userPass = new UserPass();
            userPass.UserId = user.Id;
            userPass.PasswordHash = passwordHash;
            userPass.PasswordSalt = passwordSalt;
            userPass.User = user;

            _userRepository.InsertPass(userPass);

            Prosummer prosummer = new Prosummer();
            //prosummer.UserId = user.Id;
            prosummer.User = user;
            prosummer.IsBlock = 0;
            prosummer.IsFirstTimeLogged = 0;
            prosummer.BrLK = " ";
            prosummer.Jbmg = " ";
            Adresses adress = new Adresses();
            adress.Address = registration.address;
            adress.Lat = registration.lat;
            adress.Lon = registration.lon;
            adress.City = registration.city;
            adress.County = registration.county;
            prosummer.Adresse = adress;
            RealEstate realEstate = new RealEstate();
            realEstate.Adresse = adress;
            realEstate.Type = registration.type;
            
            _adresseRepository.insert(adress);
            Prosummer newProsummer = _userRepository.returnInsertProsummer(prosummer);
            realEstate.Prosummer = newProsummer;
            _realEstateRepository.insertRealEstate(realEstate);
            

            var pageResults = 6f;
            var pageCount = Math.Ceiling(_prosummerRepository.countAllProsummers() / pageResults);
            NumberOfPagesDTO pages = new NumberOfPagesDTO();
            pages.numberOfPages = pageCount;
            return pages;

        }

        public async Task<TokenDTO> LoginUser(UserLoginDTO login)
        {
            User user = await _userRepository.getByEmail(login.Email);
            if (user == null)
            {
                throw new Exception("Wrong email");
            }

            var userPass = await _userRepository.getPassByUser(user);

            if(!VerifyPasswordHash(login.Password, userPass.PasswordHash, userPass.PasswordSalt))
            {
                throw new Exception("Wrong Password");
            }

            TokenDTO token = new TokenDTO();
            token.Token = CreateToken(user);
            token.user = AESEncryptor.EncryptStringAES(Convert.ToString(user.Id));

            return token;
        }

        public bool ValidateToken(string token)
        {
            if(token == null)
            {
                return false;
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = System.Text.Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:JWT").Value);

            try
            {
                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false, ValidateAudience = false,
                    ClockSkew = TimeSpan.Zero

                }, out SecurityToken validateToken);

                var jwtToken = (JwtSecurityToken)validateToken;

                var userId = int.Parse(jwtToken.Claims.First(x => x.Type == "id").Value);

                User user = _userRepository.getById(userId);

                if(user == null)
                {
                    return false;
                }
                return true;

            } catch
            {
                return false;
            }
        }

        private string CreateToken(User user)
        {
            var userRole = (RoleENUM)getRoleByUserId(user.Id).Result.role;

            List<Claim> claims = new List<Claim>
            {
                new Claim("id", user.Id.ToString()),
                new Claim("email",user.Email),
                new Claim(ClaimTypes.Role, userRole.ToString())
            };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:JWT").Value));

            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(claims: claims, expires: DateTime.Now.AddDays(1), signingCredentials: cred);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return computedHash.SequenceEqual(passwordHash);
            }
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        public async Task<RoleDTO> getRoleByUserId(int userId)
        {
            User userReal = _userRepository.getById(userId);
            
            if (userReal == null)
            {
                throw new Exception("There is no such user");
            }

            RoleDTO role = new RoleDTO();

            Prosummer prosummer = await _userRepository.getProsummerByUser(userReal);
            if (prosummer != null)
            {
                role.role = (RoleENUM)0;
                role.isBlock = prosummer.IsBlock;
                role.isFirstTimeLogged = prosummer.IsFirstTimeLogged;
                return role;
            }

            Admin admin = await _userRepository.getAdminByUser(userReal);
            if (admin != null)
            {
                role.role = (RoleENUM)1;
                return role;
            }

            role.role = (RoleENUM)(-1);
            return role;
        }

        public async Task<ProsummerDTO> firstTimeProsummer(ProsumerFirstTimeDTO param)
        {
            var id = Convert.ToInt32(AESEncryptor.DecryptStringAES(param.id));
            User user = _userRepository.getById(id);

            CreatePasswordHash(param.password, out byte[] passwordHash, out byte[] passwordSalt);

            UserPass userPass = await _userRepository.getPassByUser(user);
            userPass.PasswordHash= passwordHash;
            userPass.PasswordSalt= passwordSalt;
            _userRepository.UpdatePass(userPass);

            Prosummer prosummer = await _userRepository.getProsummerByUser(user);
            prosummer.BrLK = param.brlk;
            prosummer.Jbmg = param.jbmg;
            prosummer.IsFirstTimeLogged = 1;
            _userRepository.UpdateProsummer(prosummer);

            return new ProsummerDTO(prosummer, new List<Devices>());
        }

        public async Task<bool> doesUserExists(string email)
        {
            return await _userRepository.doesUserExists(email);
        }
    }
}

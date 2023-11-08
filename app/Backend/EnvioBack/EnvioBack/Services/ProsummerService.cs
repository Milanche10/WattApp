using EnvioBack.DTOs;
using EnvioBack.Entities;
using EnvioBack.Repository;
using EnvioBack.Repository.interfaces;
using EnvioBack.Services.interfaces;
using Microsoft.Extensions.Hosting;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Text;

namespace EnvioBack.Services
{
    public class ProsummerService : IProsummerService
    {
        private readonly IProsummerRepository _prosummerRepository;
        private readonly IDeviceService _deviceService;
        private readonly IUserRepository _userRepository;

        public ProsummerService(IProsummerRepository prosummerRepository, IDeviceService deviceService, IUserRepository userRepository)
        {
            _prosummerRepository = prosummerRepository;
            _deviceService = deviceService;
            _userRepository = userRepository;
        }

        public void changeState(int id, int state)
        {
            _prosummerRepository.changeState(id, state);
        }

        public void Delete(int id)
        {
            _deviceService.DeleteByProsummerId(id);
            _prosummerRepository.Delete(id);
        }

        public async Task<List<ProsummerDTO>> GetAllProsummers()
        {
            List<Prosummer> prosummers = await _prosummerRepository.getAll();
            
            List<ProsummerDTO> getAll = new List<ProsummerDTO>();
            prosummers.ForEach(p =>
            {
                List<Devices> prosummerDevices = _deviceService.getAllDevicesByProsummer(p).Result;
                getAll.Add(new ProsummerDTO(p,prosummerDevices));
            });

            return getAll;
        }

        public async Task<ProsummerPagingDTO> GetAllProsummersPaging(int page)
        {
            var pageResults = 6f;
            var pageCount = Math.Ceiling(_prosummerRepository.countAllProsummers() / pageResults);

            var prosummers = await _prosummerRepository.getAllProsummersByPage(page, (int)pageResults);

            ProsummerPagingDTO prosummerPagingDTO = new ProsummerPagingDTO();

            List<ProsummerDTO> prosummersDto = new List<ProsummerDTO>();

            prosummers.ForEach(prosummer =>
            {
                List<Devices> prosummerDevices = _deviceService.getAllDevicesByProsummer(prosummer).Result;
                prosummersDto.Add(new ProsummerDTO(prosummer, prosummerDevices));
            });

            prosummerPagingDTO.Prosummers = prosummersDto;
            prosummerPagingDTO.CurrentPage = page;
            prosummerPagingDTO.NumberOfPages = (int)pageCount;

            return prosummerPagingDTO;
        }

        public async Task<List<ProsummerDTO>> GetProsummerByAdresse(int adresseId)
        {
            List<Prosummer> prosummers = await _prosummerRepository.getProsummerByAdresse(adresseId);
            List<ProsummerDTO> getAll = new List<ProsummerDTO>();
            prosummers.ForEach(p =>
            {
                List<Devices> prosummerDevices = _deviceService.getAllDevicesByProsummer(p).Result;
                getAll.Add(new ProsummerDTO(p, prosummerDevices));
            });
            return getAll;
        }

        public async Task<List<ProsummerDTO>> getProsummerByAdresseCity(string city)
        {
            List<Prosummer> prosummers = await _prosummerRepository.getProsummerByAdresseCity(city);
            List<ProsummerDTO> getAll = new List<ProsummerDTO>();
            prosummers.ForEach(p =>
            {
                List<Devices> prosummerDevices = _deviceService.getAllDevicesByProsummer(p).Result;
                getAll.Add(new ProsummerDTO(p, prosummerDevices));
            });
            return getAll;
        }

        public async Task<List<ProsummerDTO>> getProsummerByAdresseCounty(string county)
        {
            List<Prosummer> prosummers = await _prosummerRepository.getProsummerByAdresseCounty(county);
            List<ProsummerDTO> getAll = new List<ProsummerDTO>();
            prosummers.ForEach(p =>
            {
                List<Devices> prosummerDevices = _deviceService.getAllDevicesByProsummer(p).Result;
                getAll.Add(new ProsummerDTO(p, prosummerDevices));
            });
            return getAll;
        }

        public async Task<ProsummerPagingDTO> getProsummerByFilters(ProsummerFilterDTO filter)
        {
            var pageResults = 6f;
            var pageCount = Math.Ceiling(_prosummerRepository.countAllProsummersByFilter(filter) / pageResults);

            List<Prosummer> prosummers = await _prosummerRepository.getProsummerByFilters(filter,(int)pageResults);
            ProsummerPagingDTO prosummerPagingDTO = new ProsummerPagingDTO();
            List<ProsummerDTO> getAll = new List<ProsummerDTO>();

            prosummers.ForEach(p =>
            {
                List<Devices> prosummerDevices = _deviceService.getAllDevicesByProsummer(p).Result;
                getAll.Add(new ProsummerDTO(p, prosummerDevices));
            });

            prosummerPagingDTO.Prosummers = getAll;
            prosummerPagingDTO.CurrentPage = filter.Page;
            prosummerPagingDTO.NumberOfPages = (int)pageCount;

            return prosummerPagingDTO;
        }

        public async Task<ProsummerDTO> GetProsummerById(int id)
        {
            Prosummer prosummer = await _prosummerRepository.getProsummerById(id);
            return new ProsummerDTO(prosummer,await _deviceService.getAllDevicesByProsummer(prosummer)); 
        }

        public void sendEmail(string email)
        {
            MailMessage message = new MailMessage();
            message.From = new MailAddress("enviocompanywa@gmail.com");
            message.To.Add(new MailAddress(email));
            User user = _userRepository.getByEmail(email).Result;
            message.Subject = "Verification email";
            message.IsBodyHtml = true;
            message.BodyEncoding = Encoding.UTF8;
            message.Body = "<head>\r\n  <title></title>\r\n  <!--[if !mso]><!-- -->\r\n  <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\r\n  <!--<![endif]-->\r\n  <meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\">\r\n  <style type=\"text/css\">\r\n    #outlook a {\r\n      padding: 0;\r\n    }\r\n\r\n    .ReadMsgBody {\r\n      width: 100%;\r\n    }\r\n\r\n    .ExternalClass {\r\n      width: 100%;\r\n    }\r\n\r\n    .ExternalClass * {\r\n      line-height: 100%;\r\n    }\r\n\r\n    body {\r\n      margin: 0;\r\n      padding: 0;\r\n      -webkit-text-size-adjust: 100%;\r\n      -ms-text-size-adjust: 100%;\r\n    }\r\n\r\n    table,\r\n    td {\r\n      border-collapse: collapse;\r\n      mso-table-lspace: 0pt;\r\n      mso-table-rspace: 0pt;\r\n    }\r\n\r\n    img {\r\n      border: 0;\r\n      height: auto;\r\n      line-height: 100%;\r\n      outline: none;\r\n      text-decoration: none;\r\n      -ms-interpolation-mode: bicubic;\r\n    }\r\n\r\n    p {\r\n      display: block;\r\n      margin: 13px 0;\r\n    }\r\n  </style>\r\n  <!--[if !mso]><!-->\r\n  <style type=\"text/css\">\r\n    @media only screen and (max-width:480px) {\r\n      @-ms-viewport {\r\n        width: 320px;\r\n      }\r\n\r\n      @viewport {\r\n        width: 320px;\r\n      }\r\n    }\r\n  </style>\r\n  <!--<![endif]-->\r\n  <!--[if mso]>\r\n<xml>\r\n  <o:OfficeDocumentSettings>\r\n    <o:AllowPNG/>\r\n    <o:PixelsPerInch>96</o:PixelsPerInch>\r\n  </o:OfficeDocumentSettings>\r\n</xml>\r\n<![endif]-->\r\n  <!--[if lte mso 11]>\r\n<style type=\"text/css\">\r\n  .outlook-group-fix {\r\n    width:100% !important;\r\n  }\r\n</style>\r\n<![endif]-->\r\n\r\n  <!--[if !mso]><!-->\r\n  <link href=\"https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700\" rel=\"stylesheet\" type=\"text/css\">\r\n  <style type=\"text/css\">\r\n    @import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);\r\n  </style>\r\n  <!--<![endif]-->\r\n  <style type=\"text/css\">\r\n    @media only screen and (min-width:480px) {\r\n\r\n      .mj-column-per-100,\r\n      * [aria-labelledby=\"mj-column-per-100\"] {\r\n        width: 100% !important;\r\n      }\r\n    }\r\n  </style>\r\n</head>\r\n\r\n<body style=\"background: #F9F9F9;\">\r\n  <div style=\"background-color:#F9F9F9;\">\r\n    <!--[if mso | IE]>\r\n      <table role=\"presentation\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"640\" align=\"center\" style=\"width:640px;\">\r\n        <tr>\r\n          <td style=\"line-height:0px;font-size:0px;mso-line-height-rule:exactly;\">\r\n      <![endif]-->\r\n    <style type=\"text/css\">\r\n      html,\r\n      body,\r\n      * {\r\n        -webkit-text-size-adjust: none;\r\n        text-size-adjust: none;\r\n      }\r\n\r\n      a {\r\n        color: #1EB0F4;\r\n        text-decoration: none;\r\n      }\r\n\r\n      a:hover {\r\n        text-decoration: underline;\r\n      }\r\n    </style>\r\n    <div style=\"margin:0px auto;max-width:640px;background:transparent;\">\r\n      <table role=\"presentation\" cellpadding=\"0\" cellspacing=\"0\" style=\"font-size:0px;width:100%;background:transparent;\" align=\"center\" border=\"0\">\r\n        <tbody>\r\n          <tr>\r\n            <td style=\"text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:40px 0px;\">\r\n              <!--[if mso | IE]>\r\n      <table role=\"presentation\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\"><tr><td style=\"vertical-align:top;width:640px;\">\r\n      <![endif]-->\r\n              <div aria-labelledby=\"mj-column-per-100\" class=\"mj-column-per-100 outlook-group-fix\" style=\"vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;\">\r\n                <table role=\"presentation\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" border=\"0\">\r\n                  <tbody>\r\n                    <tr>\r\n                      <td style=\"word-break:break-word;font-size:0px;padding:0px;\" align=\"center\">\r\n                        <table role=\"presentation\" cellpadding=\"0\" cellspacing=\"0\" style=\"border-collapse:collapse;border-spacing:0px;\" align=\"center\" border=\"0\">\r\n                          <tbody>\r\n                            <tr>\r\n                              <td style=\"width:138px;\"><a href=\"link to app goes here\" target=\"_blank\">" +
                "<!--<img alt=\"Envio logo\" title=\"\" height=\"38px\" src=\"/Images/assets/logo1.png\" style=\"border:none;border-radius:;display:block;outline:none;text-decoration:none;width:100%;height:38px;\" width=\"138\"></a>--></td>\r\n                            </tr>\r\n                          </tbody>\r\n                        </table>\r\n                      </td>\r\n                    </tr>\r\n                  </tbody>\r\n                </table>\r\n              </div>\r\n              <!--[if mso | IE]>\r\n      </td></tr></table>\r\n      <![endif]-->\r\n            </td>\r\n          </tr>\r\n        </tbody>\r\n      </table>\r\n    </div>\r\n    <!--[if mso | IE]>\r\n      </td></tr></table>\r\n      <![endif]-->\r\n    <!--[if mso | IE]>\r\n      <table role=\"presentation\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"640\" align=\"center\" style=\"width:640px;\">\r\n        <tr>\r\n          <td style=\"line-height:0px;font-size:0px;mso-line-height-rule:exactly;\">\r\n      <![endif]-->\r\n    <div style=\"max-width:640px;margin:0 auto;box-shadow:0px 1px 5px rgba(0,0,0,0.1);border-radius:4px;overflow:hidden\">\r\n      <div style=\"margin:0px auto;max-width:640px;background:#7289DA url(https://cdn.discordapp.com/email_assets/f0a4cc6d7aaa7bdf2a3c15a193c6d224.png) top center / cover no-repeat;\">\r\n        <!--[if mso | IE]>\r\n      <v:rect xmlns:v=\"urn:schemas-microsoft-com:vml\" fill=\"true\" stroke=\"false\" style=\"width:640px;\">\r\n        <v:fill origin=\"0.5, 0\" position=\"0.5,0\" type=\"tile\" src=\"https://cdn.discordapp.com/email_assets/f0a4cc6d7aaa7bdf2a3c15a193c6d224.png\" />\r\n        <v:textbox style=\"mso-fit-shape-to-text:true\" inset=\"0,0,0,0\">\r\n      <![endif]-->\r\n        <table role=\"presentation\" cellpadding=\"0\" cellspacing=\"0\" style=\"font-size:0px;width:100%;background:#7289DA url(https://cdn.discordapp.com/email_assets/f0a4cc6d7aaa7bdf2a3c15a193c6d224.png) top center / cover no-repeat;\" align=\"center\" border=\"0\" background=\"https://cdn.discordapp.com/email_assets/f0a4cc6d7aaa7bdf2a3c15a193c6d224.png\">\r\n          <tbody>\r\n            <tr>\r\n              <td style=\"text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:57px;\">\r\n                <!--[if mso | IE]>\r\n      <table role=\"presentation\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\"><tr><td style=\"vertical-align:undefined;width:640px;\">\r\n      <![endif]-->\r\n                <div style=\"cursor:auto;color:white;font-family:Whitney, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;font-size:36px;font-weight:600;line-height:36px;text-align:center;\">Welcome to WattApp!</div>\r\n                <!--[if mso | IE]>\r\n      </td></tr></table>\r\n      <![endif]-->\r\n              </td>\r\n            </tr>\r\n          </tbody>\r\n        </table>\r\n        <!--[if mso | IE]>\r\n        </v:textbox>\r\n      </v:rect>\r\n      <![endif]-->\r\n      </div>\r\n      <!--[if mso | IE]>\r\n      </td></tr></table>\r\n      <![endif]-->\r\n      <!--[if mso | IE]>\r\n      <table role=\"presentation\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"640\" align=\"center\" style=\"width:640px;\">\r\n        <tr>\r\n          <td style=\"line-height:0px;font-size:0px;mso-line-height-rule:exactly;\">\r\n      <![endif]-->\r\n      <div style=\"margin:0px auto;max-width:640px;background:#ffffff;\">\r\n        <table role=\"presentation\" cellpadding=\"0\" cellspacing=\"0\" style=\"font-size:0px;width:100%;background:#ffffff;\" align=\"center\" border=\"0\">\r\n          <tbody>\r\n            <tr>\r\n              <td style=\"text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:40px 70px;\">\r\n                <!--[if mso | IE]>\r\n      <table role=\"presentation\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\"><tr><td style=\"vertical-align:top;width:640px;\">\r\n      <![endif]-->\r\n                <div aria-labelledby=\"mj-column-per-100\" class=\"mj-column-per-100 outlook-group-fix\" style=\"vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;\">\r\n                  <table role=\"presentation\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" border=\"0\">\r\n                    <tbody>\r\n                      <tr>\r\n                        <td style=\"word-break:break-word;font-size:0px;padding:0px 0px 20px;\" align=\"left\">\r\n                          <div style=\"cursor:auto;color:#737F8D;font-family:Whitney, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;font-size:16px;line-height:24px;text-align:left;\">\r\n                            <p><img src=\"https://cdn.discordapp.com/email_assets/127c95bbea39cd4bc1ad87d1500ae27d.png\" alt=\"Party Wumpus\" title=\"None\" width=\"500\" style=\"height: auto;\"></p>\r\n\r\n                            <h2 style=\"font-family: Whitney, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;font-weight: 500;font-size: 20px;color: #4F545C;letter-spacing: 0.27px;\">Hey,</h2>\r\n                            <p>Wowwee! Thanks for registering an account on WattApp! You're the coolest person in all the land (and I've met a lot of really cool people).</p>\r\n                            <p>Before we get started, you will need to sign up with your new credentials!</p>\r\n\r\n                          </div>\r\n                        </td>\r\n                      </tr>\r\n                      <tr>\r\n                        <td style=\"word-break:break-word;font-size:0px;padding:10px 25px;\" align=\"center\">\r\n                          <table role=\"presentation\" cellpadding=\"0\" cellspacing=\"0\" style=\"border-collapse:separate;\" align=\"center\" border=\"0\">\r\n                            <tbody>\r\n                              <tr>\r\n                                <td style=\"border:none;border-radius:3px;color:white;cursor:auto;padding:15px 19px;\" align=\"center\" valign=\"middle\" bgcolor=\"#7289DA\">" +
                "<p style=\"text-decoration:none;line-height:100%;background:#7289DA;color:white;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:15px;font-weight:normal;text-transform:none;margin:0px;\"> Your password is: " +user.FirstName.ToLower()+""+user.LastName.ToLower()+ " </p></td>\r\n                              </tr>\r\n                            </tbody>\r\n                          </table>\r\n                        </td>\r\n                      </tr>\r\n                    </tbody>\r\n                  </table>\r\n                </div>\r\n                <!--[if mso | IE]>\r\n      </td></tr></table>\r\n      <![endif]-->\r\n              </td>\r\n            </tr>\r\n          </tbody>\r\n        </table>\r\n      </div>\r\n      <!--[if mso | IE]>\r\n      </td></tr></table>\r\n      <![endif]-->\r\n      <!--[if mso | IE]>\r\n      <table role=\"presentation\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"640\" align=\"center\" style=\"width:640px;\">\r\n        <tr>\r\n          <td style=\"line-height:0px;font-size:0px;mso-line-height-rule:exactly;\">\r\n      <![endif]-->\r\n    </div>\r\n    <div style=\"margin:0px auto;max-width:640px;background:transparent;\">\r\n      <table role=\"presentation\" cellpadding=\"0\" cellspacing=\"0\" style=\"font-size:0px;width:100%;background:transparent;\" align=\"center\" border=\"0\">\r\n        <tbody>\r\n          <tr>\r\n            <td style=\"text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:0px;\">\r\n              <!--[if mso | IE]>\r\n      <table role=\"presentation\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\"><tr><td style=\"vertical-align:top;width:640px;\">\r\n      <![endif]-->\r\n              <div aria-labelledby=\"mj-column-per-100\" class=\"mj-column-per-100 outlook-group-fix\" style=\"vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;\">\r\n                <table role=\"presentation\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" border=\"0\">\r\n                  <tbody>\r\n                    <tr>\r\n                      <td style=\"word-break:break-word;font-size:0px;\">\r\n                        <div style=\"font-size:1px;line-height:12px;\">&nbsp;</div>\r\n                      </td>\r\n                    </tr>\r\n                  </tbody>\r\n                </table>\r\n              </div>\r\n              <!--[if mso | IE]>\r\n      </td></tr></table>\r\n      <![endif]-->\r\n            </td>\r\n          </tr>\r\n        </tbody>\r\n      </table>\r\n    </div>\r\n    <!--[if mso | IE]>\r\n      </td></tr></table>\r\n      <![endif]-->\r\n    <!--[if mso | IE]>\r\n      <table role=\"presentation\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"640\" align=\"center\" style=\"width:640px;\">\r\n        <tr>\r\n          <td style=\"line-height:0px;font-size:0px;mso-line-height-rule:exactly;\">\r\n      <![endif]-->\r\n    <div style=\"margin:0 auto;max-width:640px;background:#ffffff;box-shadow:0px 1px 5px rgba(0,0,0,0.1);border-radius:4px;overflow:hidden;\">\r\n      <table cellpadding=\"0\" cellspacing=\"0\" style=\"font-size:0px;width:100%;background:#ffffff;\" align=\"center\" border=\"0\">\r\n        <tbody>\r\n          <tr>\r\n            <td style=\"text-align:center;vertical-align:top;font-size:0px;padding:0px;\">\r\n              <!--[if mso | IE]>\r\n      <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\"><tr><td style=\"vertical-align:top;width:640px;\">\r\n      <![endif]-->\r\n              <div aria-labelledby=\"mj-column-per-100\" class=\"mj-column-per-100 outlook-group-fix\" style=\"vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;\">\r\n                <table role=\"presentation\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" border=\"0\">\r\n                  <tbody>\r\n                    <tr>\r\n                      <td style=\"word-break:break-word;font-size:0px;padding:30px 70px 0px 70px;\" align=\"center\">\r\n                        <div style=\"cursor:auto;color:#43B581;font-family:Whitney, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;font-size:18px;font-weight:bold;line-height:16px;text-align:center;\">FUN FACT #16</div>\r\n                      </td>\r\n                    </tr>\r\n                    <tr>\r\n                      <td style=\"word-break:break-word;font-size:0px;padding:14px 70px 30px 70px;\" align=\"center\">\r\n                        <div style=\"cursor:auto;color:#737F8D;font-family:Whitney, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;font-size:16px;line-height:22px;text-align:center;\">\r\n                          Using WattApp created by Envio makes you one of the special and inovative people that look ahead in future and we are happy for that.\r\n                        </div>\r\n                      </td>\r\n                    </tr>\r\n                  </tbody>\r\n                </table>\r\n              </div>\r\n              <!--[if mso | IE]>\r\n      </td></tr></table>\r\n      <![endif]-->\r\n            </td>\r\n          </tr>\r\n        </tbody>\r\n      </table>\r\n    </div>\r\n    <!--[if mso | IE]>\r\n      </td></tr></table>\r\n      <![endif]-->\r\n    <!--[if mso | IE]>\r\n      <table role=\"presentation\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"640\" align=\"center\" style=\"width:640px;\">\r\n        <tr>\r\n          <td style=\"line-height:0px;font-size:0px;mso-line-height-rule:exactly;\">\r\n      <![endif]-->\r\n    <div style=\"margin:0px auto;max-width:640px;background:transparent;\">\r\n      <table role=\"presentation\" cellpadding=\"0\" cellspacing=\"0\" style=\"font-size:0px;width:100%;background:transparent;\" align=\"center\" border=\"0\">\r\n        <tbody>\r\n          <tr>\r\n            <td style=\"text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:20px 0px;\">\r\n              <!--[if mso | IE]>\r\n      <table role=\"presentation\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\"><tr><td style=\"vertical-align:top;width:640px;\">\r\n      <![endif]-->\r\n              <div aria-labelledby=\"mj-column-per-100\" class=\"mj-column-per-100 outlook-group-fix\" style=\"vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;\">\r\n                <table role=\"presentation\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" border=\"0\">\r\n                  <tbody>\r\n                    <tr>\r\n                      <td style=\"word-break:break-word;font-size:0px;padding:0px;\" align=\"center\">\r\n                        <div style=\"cursor:auto;color:#99AAB5;font-family:Whitney, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;font-size:12px;line-height:24px;text-align:center;\">\r\n                          " +
                "Sent by Envio • <a href=\"http://localhost:4200/login\" style=\"color:#1EB0F4;text-decoration:none;\" target=\"_blank\">check our app</a> • <a href=\"https://www.instagram.com/m.jovanoviic01/\" style=\"color:#1EB0F4;text-decoration:none;\" target=\"_blank\">@envio</a>\r\n                        </div>\r\n                      </td>\r\n                    </tr>\r\n                    <tr>\r\n                      <td style=\"word-break:break-word;font-size:0px;padding:0px;\" align=\"center\">\r\n                        <div style=\"cursor:auto;color:#99AAB5;font-family:Whitney, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;font-size:12px;line-height:24px;text-align:center;\">\r\n                          Radoje Domanovica 1, Kragujevac, Kragujevac, 34000\r\n                        </div>\r\n                      </td>\r\n                    </tr>\r\n                  </tbody>\r\n                </table>\r\n              </div>\r\n              <!--[if mso | IE]>\r\n      </td></tr></table>\r\n      <![endif]-->\r\n            </td>\r\n          </tr>\r\n        </tbody>\r\n      </table>\r\n    </div>\r\n    <!--[if mso | IE]>\r\n      </td></tr></table>\r\n      <![endif]-->\r\n  </div>\r\n\r\n</body>";
            
                // Set up the SMTP client
            SmtpClient smtpClient = new SmtpClient("smtp.gmail.com", 587);
            smtpClient.UseDefaultCredentials = false;
            smtpClient.Credentials = new NetworkCredential("enviocompanywa@gmail.com", "fnuw xebi ckcx vrnk");
            smtpClient.EnableSsl = true;

            // Send the email
            smtpClient.Send(message);
        }

        public async Task<bool> verifyEmail(string email)
        {
            SmtpSettings _smtpSettings = new SmtpSettings
            {
                Host = "smtp.gmail.com",
                Port = 587,
                FromEmail = "enviocompanywa@gmail.com",
                FromName = "Envio",
                Timeout = 5000,
                EnableSsl = true 
            };
            using (var client = new SmtpClient(_smtpSettings.Host, _smtpSettings.Port))
            {
                client.Timeout = _smtpSettings.Timeout;

                if (_smtpSettings.EnableSsl)
                {
                    client.EnableSsl = true;
                }

                try
                {
                    var fromAddress = new MailAddress(_smtpSettings.FromEmail, _smtpSettings.FromName);
                    var toAddress = new MailAddress(email);
                    var message = new MailMessage(fromAddress, toAddress)
                    {
                        Subject = "Email Verification",
                        Body = "Please click the verification link to confirm your email."
                        // You can include a verification link in the email body
                    };
                    client.UseDefaultCredentials = false;
                    client.Credentials = new NetworkCredential(_smtpSettings.FromEmail, "fnuw xebi ckcx vrnk");
                    client.Send(message);

                    return true;
                }
                catch (SmtpException)
                {
                    return false;
                }
            }
        }
    }
}

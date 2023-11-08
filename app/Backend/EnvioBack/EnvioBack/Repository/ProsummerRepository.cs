using EnvioBack.Data;
using EnvioBack.DTOs;
using EnvioBack.Entities;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;

namespace EnvioBack.Repository.interfaces
{
    public class ProsummerRepository : IProsummerRepository
    {
        private readonly DatabaseContext _context;

        public ProsummerRepository(DatabaseContext context)
        {
            _context = context;
        }

        public async void changeState(int id, int state)
        {
            Prosummer prosummer = await _context.Prosummers.Where(p => p.Id == id).FirstOrDefaultAsync();
            if(prosummer == null) 
            {
                throw new Exception("There is no user with such id");
            }
            prosummer.IsBlock = state;
            _context.Prosummers.Update(prosummer);
            await _context.SaveChangesAsync();
        }

        public int countAllProsummers()
        {
            return _context.Prosummers.Count();
        }

        public int countAllProsummersByFilter(ProsummerFilterDTO filterDTO)
        {
            return _context.Prosummers
                .Include(p => p.User)
                .Include(p => p.Adresse)
                .Where
                (
                    p => p.Adresse.County.ToLower().Contains(filterDTO.CountySearch.ToLower())
                    && p.Adresse.City.ToLower().Contains(filterDTO.CitySearch.ToLower())
                    && p.BrLK.ToLower().Contains(filterDTO.BrLkSearch.ToLower())
                    && p.Jbmg.ToLower().Contains(filterDTO.JbmgSearch.ToLower())
                    && (p.User.Email.ToLower().Contains(filterDTO.SearchBarText.ToLower())
                        || p.User.FirstName.ToLower().Contains(filterDTO.SearchBarText.ToLower())
                        || p.User.LastName.ToLower().Contains(filterDTO.SearchBarText.ToLower()))
                ).Count();
        }

        public async void Delete(int id)
        {
            Prosummer prosummer = await _context.Prosummers
                .Include(p => p.User)
                .Include(p => p.Adresse)
                .Where(p => p.Id == id)
                .FirstOrDefaultAsync();
            _context.adresses.Remove(prosummer.Adresse);
            _context.Users.Remove(prosummer.User);
            _context.Prosummers.Remove(prosummer);
            await _context.SaveChangesAsync();
        }

        public async Task<List<Prosummer>> getAll()
        {
            List<Prosummer> prosummers = await _context.Prosummers
                .Include(p => p.User)
                .Include(p => p.Adresse)
                .ToListAsync();
            return prosummers;
            
        }


        public async Task<List<Prosummer>> getAllProsummersByPage(int page, int pageResults)
        {
            return await _context.Prosummers
                .Include(p => p.User)
                .Include(p => p.Adresse)
                .Skip((page-1) * pageResults)
                .Take(pageResults)
                .ToListAsync();
        }

        public async Task<List<Prosummer>> getProsummerByAdresse(int adresseId)
        {
            return await _context.Prosummers
                .Include(p => p.User)
                .Include(p => p.Adresse)
                .Where(p => p.Adresse.Id == adresseId)
                .ToListAsync();
        }

        public async Task<List<Prosummer>> getProsummerByAdresseCity(string city)
        {
            return await _context.Prosummers
                .Include(p => p.User)
                .Include(p => p.Adresse)
                .Where(p => p.Adresse.City.Equals(city))
                .ToListAsync();
        }

        public async Task<List<Prosummer>> getProsummerByAdresseCounty(string county)
        {
            return await _context.Prosummers
                .Include(p => p.User)
                .Include(p => p.Adresse)
                .Where(p=>p.Adresse.County.Equals(county))
                .ToListAsync();
        }

        public async Task<List<Prosummer>> getProsummerByFilters(ProsummerFilterDTO filterDTO, int pageResults)
        {
            return await _context.Prosummers
                .Include(p => p.User)
                .Include(p => p.Adresse)
                .Where
                (
                    p=>p.Adresse.County.ToLower().Contains(filterDTO.CountySearch.ToLower()) 
                    && p.Adresse.City.ToLower().Contains(filterDTO.CitySearch.ToLower())
                    && p.BrLK.ToLower().Contains(filterDTO.BrLkSearch.ToLower())
                    && p.Jbmg.ToLower().Contains(filterDTO.JbmgSearch.ToLower())
                    && (p.User.Email.ToLower().Contains(filterDTO.SearchBarText.ToLower()) 
                        || p.User.FirstName.ToLower().Contains(filterDTO.SearchBarText.ToLower()) 
                        || p.User.LastName.ToLower().Contains(filterDTO.SearchBarText.ToLower()))
                )
                .Skip((filterDTO.Page - 1) * pageResults)
                .Take(pageResults)
                .ToListAsync();
        }

        public async Task<Prosummer> getProsummerById(int id)
        {
            User user = _context.Users.Where(u=>u.Id == id).FirstOrDefault();

            Prosummer prosummer = await _context.Prosummers
                .Include(p => p.User)
                .Include(p => p.Adresse)
                .Where(p => p.User == user)
                .FirstOrDefaultAsync();
            return prosummer;
        }
    }
}

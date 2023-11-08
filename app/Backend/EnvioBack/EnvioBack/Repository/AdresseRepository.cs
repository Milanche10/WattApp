using EnvioBack.Data;
using EnvioBack.Data;
using EnvioBack.Entities;
using EnvioBack.Repository.interfaces;
using Microsoft.EntityFrameworkCore;

namespace EnvioBack.Repository
{
    public class AdresseRepository : IAdresseRepository
    {
        private readonly DatabaseContext _context;
        public AdresseRepository(DatabaseContext context)
        {
            _context = context;
        }

        public async Task<Adresses> getAdressByLatandLon(double lat, double lon)
        {
            return await _context.adresses
                .Where(a => a.Lat == lat && a.Lon == lon)
                .FirstOrDefaultAsync();
        }

        public async Task<Adresses> getAdressesById(int id)
        {
            return await _context.adresses
                .Where (a => a.Id == id)
                .FirstOrDefaultAsync();
        }

        public async void insert(Adresses adresse)
        {
            await _context.adresses.AddAsync(adresse);
            await _context.SaveChangesAsync();
        }
    }
}

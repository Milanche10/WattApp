using EnvioBack.Data;
using EnvioBack.Entities;
using EnvioBack.Repository.interfaces;
using Microsoft.EntityFrameworkCore;

namespace EnvioBack.Repository
{
    public class RealEstateRepository : IRealEstateRepository
    {
        private readonly DatabaseContext _context;

        public RealEstateRepository(DatabaseContext context)
        {
            _context = context;
        }

        public async Task<List<RealEstate>> getAllRealEstatesByProsummerId(int prosummerId)
        {
            return await _context.RealEstates
                .Include(r=>r.Prosummer)
                .Include(r=>r.Adresse)
                .Where(r=>r.ProsummerId == prosummerId)
                .ToListAsync();
        }

        public async Task insertRealEstate(RealEstate realEstate)
        {
            await _context.RealEstates.AddAsync(realEstate);
            await _context.SaveChangesAsync();
        }

        public async Task<RealEstate> getRealEstateById(int id)
        {
            return await _context.RealEstates
                .Include(re => re.Adresse)
                .Include(re => re.Prosummer)
                .FirstOrDefaultAsync(re => re.Id == id);
        }
    }
}

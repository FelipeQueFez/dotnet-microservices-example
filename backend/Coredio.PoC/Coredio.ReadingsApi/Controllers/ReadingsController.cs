using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class ReadingsController : ControllerBase
{
    private readonly AppDbContext _db;
    public ReadingsController(AppDbContext db) => _db = db;

    // GET /api/readings?patientId=1
    [HttpGet]
    public async Task<IEnumerable<Reading>> Get([FromQuery] int? patientId)
    {
        var q = _db.Readings.AsQueryable();
        if (patientId.HasValue) q = q.Where(r => r.PatientId == patientId.Value);
        return await q.OrderByDescending(r => r.Timestamp).Take(100).ToListAsync();
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<Reading>> GetById(int id)
    {
        var r = await _db.Readings.FindAsync(id);
        return r is null ? NotFound() : Ok(r);
    }

    [HttpPost]
    public async Task<ActionResult<Reading>> Create(Reading r)
    {
        _db.Readings.Add(r);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = r.Id }, r);
    }
}

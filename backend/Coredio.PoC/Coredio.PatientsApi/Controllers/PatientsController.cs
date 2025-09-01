using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class PatientsController : ControllerBase
{
    private readonly AppDbContext _db;
    public PatientsController(AppDbContext db) => _db = db;

    [HttpGet]
    public async Task<IEnumerable<Patient>> Get() =>
        await _db.Patients.OrderBy(p => p.Id).ToListAsync();

    [HttpGet("{id:int}")]
    public async Task<ActionResult<Patient>> GetById(int id)
    {
        var p = await _db.Patients.FindAsync(id);
        return p is null ? NotFound() : Ok(p);
    }

    [HttpPost]
    public async Task<ActionResult<Patient>> Create(Patient p)
    {
        _db.Patients.Add(p);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = p.Id }, p);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, Patient p)
    {
        if (id != p.Id) return BadRequest();
        var exists = await _db.Patients.AnyAsync(x => x.Id == id);
        if (!exists) return NotFound();
        _db.Entry(p).State = EntityState.Modified;
        await _db.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var p = await _db.Patients.FindAsync(id);
        if (p is null) return NotFound();
        _db.Remove(p);
        await _db.SaveChangesAsync();
        return NoContent();
    }
}

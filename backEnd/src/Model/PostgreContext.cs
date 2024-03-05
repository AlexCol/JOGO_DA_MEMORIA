using Microsoft.EntityFrameworkCore;

namespace backEnd.src.Model;

public class PostgreContext : DbContext
{
	public PostgreContext() { }
	public PostgreContext(DbContextOptions<PostgreContext> options) : base(options)
	{
		AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true); //!para permitir usar data 'local'
	}



	protected override void OnModelCreating(ModelBuilder modelBuilder)
	{
		base.OnModelCreating(modelBuilder);
	}

}

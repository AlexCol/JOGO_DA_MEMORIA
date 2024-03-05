using backEnd.src.Model;
using Microsoft.EntityFrameworkCore;

namespace backEnd.src.Extensions.toBuilder;

public static class PostgreBuilder
{
	public static void addPostgre(this WebApplicationBuilder builder)
	{
		var conectionString = builder.Configuration["ConnectionStrings:Postgre"];
		builder.Services.AddDbContext<PostgreContext>(options =>
		{
			options.UseNpgsql(conectionString);
		});
	}
}

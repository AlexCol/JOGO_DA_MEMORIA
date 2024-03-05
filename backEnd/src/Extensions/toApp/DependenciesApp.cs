namespace backEnd.src.Extensions.toApp;

public static class DependenciesApp
{
	public static void addDependencies(this WebApplication app)
	{
		app.UseCors();
		app.UseAuthentication();
		app.UseAuthorization();
		app.UseHttpsRedirection();
		app.MapControllers();

	}
}
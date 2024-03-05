using backEnd.src.Services.CryptoService;

namespace backEnd.src.Extensions.toBuilder;

public static class DependenciesBuilder {
	public static void addDependencies(this WebApplicationBuilder builder, IConfiguration _config) {
		//!adicionando configurações padrão
		builder.Services.AddEndpointsApiExplorer();
		builder.Services.AddControllers();

		//!adicionando configurações
		builder.addPostgre();
		builder.AddCors(); //?lembrar depois de colocar useCors no app
		builder.addJWTService(_config);


		//!adicionando classes para injeções de dependencia
		builder.Services.AddScoped<ICryptoService, CryptoService>();
	}
}
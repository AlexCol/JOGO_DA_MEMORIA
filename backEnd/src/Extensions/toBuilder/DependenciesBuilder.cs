using backEnd.src.Repository.ScoreRepository;
using backEnd.src.Services.CryptoService;
using backEnd.src.Services.ScoreService;

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
		builder.Services.AddScoped<IScoreRepository, ScoreRepository>();
		builder.Services.AddScoped<IScoreService, ScoreService>();
	}
}
using System;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace backEnd.src.Extensions.toBuilder
{
	public static class JWTBuilder
	{
		//! Método para configurar o serviço JWT
		public static void addJWTService(this WebApplicationBuilder builder, IConfiguration _config)
		{
			//! Configura a autenticação para usar JWT
			builder.Services.AddAuthentication(options =>
			{
				options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
				options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
			})
			.AddJwtBearer(options =>
			{
				//! Configura os parâmetros de validação do token JWT
				options.TokenValidationParameters = new TokenValidationParameters
				{
					ValidateIssuer = true,
					ValidateAudience = true,
					ValidateLifetime = true,
					ValidateIssuerSigningKey = true,
					ValidIssuer = _config["TokenConfiguration:Issuer"],
					ValidAudience = _config["TokenConfiguration:Audience"],
					IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["TokenConfiguration:Secret"])),
					ClockSkew = TimeSpan.Zero //! Tempo de tolerância após o tempo de expiração do token
				};
			});

			//! Configura as políticas de autorização
			builder.Services.AddAuthorization(auth =>
			{
				//! Define uma política padrão que exige autenticação JWT
				auth.DefaultPolicy = new AuthorizationPolicyBuilder()
									.AddAuthenticationSchemes(JwtBearerDefaults.AuthenticationScheme)
									.RequireAuthenticatedUser()
									.Build();
			});
		}
	}
}
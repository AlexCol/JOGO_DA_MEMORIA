using backEnd.src.Services.CryptoService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backEnd.src.Controller;

[ApiController]
[Authorize]
[Route("[controller]")]
public class AuthController : ControllerBase {

	private readonly ICryptoService _crypto;
	public AuthController(ICryptoService crypto) {
		_crypto = crypto;
	}

	[HttpGet]
	public IActionResult check() {
		Dictionary<string, string> lista = new Dictionary<string, string>();
		foreach (var claim in User.Claims) {
			if (claim.Type == "UserId" || claim.Type == "UserName") {
				lista.Add(claim.Type, claim.Value);
			}
		}
		return Ok(_crypto.Encrypt(lista));
	}
}

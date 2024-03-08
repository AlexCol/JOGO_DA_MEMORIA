using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backEnd.src.Model.Entity;
using backEnd.src.Services.ScoreService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backEnd.src.Controller;

[ApiController]
[Authorize]
[Route("[controller]")]
public class ScoreController : ControllerBase {

	private readonly IScoreService _service;
	public ScoreController(IScoreService service) {
		_service = service;
	}

	[HttpGet]
	[Route("")]
	public IActionResult getScores() {
		try {
			return Ok(_service.getScores());
		} catch (Exception e) {
			return BadRequest("Erro na solicitação: " + e.Message);
		}
	}

	[HttpPost]
	[Route("new")]
	public IActionResult newScore([FromBody] Score newScore) {
		try {
			return Ok(_service.newScore(newScore));
		} catch (Exception e) {
			return BadRequest("Erro na solicitação: " + e.Message);
		}
	}
}

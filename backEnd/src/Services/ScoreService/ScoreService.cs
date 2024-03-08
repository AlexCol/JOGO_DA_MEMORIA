using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backEnd.src.Model.Entity;
using backEnd.src.Repository.ScoreRepository;

namespace backEnd.src.Services.ScoreService;

public class ScoreService : IScoreService {
	private readonly IScoreRepository _repository;
	public ScoreService(IScoreRepository repository) {
		_repository = repository;
	}

	public List<Score> getScores() {
		return _repository.getScores();
	}

	public Score newScore(Score newScore) {
		return _repository.newScore(newScore);
	}
}

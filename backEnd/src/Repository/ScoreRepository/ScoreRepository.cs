using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using backEnd.src.Model;
using backEnd.src.Model.Entity;

namespace backEnd.src.Repository.ScoreRepository;

public class ScoreRepository : IScoreRepository {

	private readonly PostgreContext _context;
	public ScoreRepository(PostgreContext context) {
		_context = context;
	}

	public List<Score> getScores() {
		var list = _context.Scores.ToList();
		return list;
	}

	public Score newScore(Score newScore) {
		var score = _context.Scores.SingleOrDefault(s => s.Session == newScore.Session);
		if (score != null) {
			var newSession = _context.Scores.Max(s => s.Session) + 1;
			newScore.Session = newSession;
		}
		_context.Scores.Add(newScore);
		_context.SaveChanges();
		return newScore;
	}
}

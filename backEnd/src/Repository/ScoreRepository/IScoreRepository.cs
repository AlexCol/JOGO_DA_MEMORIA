using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backEnd.src.Model.Entity;

namespace backEnd.src.Repository.ScoreRepository;

public interface IScoreRepository {
	public List<Score> getScores();
	public Score newScore(Score newScore);
}

import styles from './Scores.module.css';
import { useEffect, useState } from "react";
import { IScore } from '../../Interfaces/IScore';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { IScoreSate } from '../../Slices/ScoreSlice';

function Scores() {
	const [firstTen, setFirstTem] = useState<IScore[]>([]);
	const [userScorePos, setUserScorePos] = useState<number>(0);
	const {userScore, scores} = useSelector<RootState, IScoreSate>(state => state.score);
	



	useEffect(() => {		
		const readedScores = [...scores];
		const orderedScores = readedScores.sort((a, b) => b.points !== a.points ? b.points - a.points : a.session - b.session);
		const first = orderedScores.slice(0, 10);
		setFirstTem(first);
		if(userScore && !first.some(f => f.session === userScore.session)) {
			const pos = orderedScores.findIndex(s => s.session === userScore.session);
			setUserScorePos(pos);
		}
	}, [])

	return (
		<div className={styles.score_board}>
			{firstTen.map((score, index) => (
				<div key={index} className={styles.individual_score}>
					<p>{index+1}</p>
					<p>{score.userId}</p>
					<p>{score.userName}</p>
					<p>{score.points}</p>
				</div>
			))}
			{userScore && userScorePos > 0 && (
				<div className={styles.individual_score2}>
				<p>{userScorePos}</p>
				<p>{userScore.userId}</p>
				<p>{userScore.userName}</p>
				<p>{userScore.points}</p>
				</div>
			)}
		</div>
	)
}
export default Scores
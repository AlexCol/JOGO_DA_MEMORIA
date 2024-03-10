import styles from './Scores.module.css';
import { useEffect, useState } from "react";
import { IScore } from '../../Interfaces/IScore';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { IScoreSate } from '../../Slices/ScoreSlice';
import { useNavigate } from 'react-router-dom';

function Scores() {
	const [firstTen, setFirstTem] = useState<IScore[]>([]);
	const [userScorePos, setUserScorePos] = useState<number>(0);
	const {userScore, scores} = useSelector<RootState, IScoreSate>(state => state.score);
	const navigate = useNavigate();
	



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

	function gotToMainMenu() {
		navigate('restart');
	};

	return (
		<div className={styles.score_board}>
			<div className={styles.individual_score}>
				<p>Posição</p>
				<p>Nome</p>
				<p>Pontuação</p>
				<p className={styles.userId}>Cod Usuário</p>
			</div>
			{firstTen.map((score, index) => (
				<div key={index} className={`${styles.individual_score} ${score.session === userScore?.session ? styles.userSession : ''}`}>
					<p>{index+1}</p>
					<p>{score.userName}</p>
					<p>{score.points}</p>
					<p className={styles.userId}>{score.userId}</p>
				</div>
			))}
			{userScore && userScorePos > 0 && (
				<div className={`${styles.individual_score} ${styles.userSession}`}>
				<p>{userScorePos}</p>
				<p>{userScore.userName}</p>
				<p>{userScore.points}</p>
				<p className={styles.userId}>{userScore.userId}</p>
				</div>
			)}
			<button onClick={gotToMainMenu}>Menu inicial</button>
		</div>
	)
}
export default Scores
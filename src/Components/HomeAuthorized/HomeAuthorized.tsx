import styles from './HomeAuthorized.module.css';

import { useEffect, useState } from "react"
import GamePrep from "../GamePrep/GamePrep";
import Game from "../Game/Game";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { logout } from '../../Slices/AuthSlice';
import { IScoreSate, getScores } from '../../Slices/ScoreSlice';
import Scores from '../Scores/Scores';

function HomeAuthorized() {
	const [gameStart, setGameStart] = useState(false);
	const [boardSize, setBoardSize] = useState<number>(0);
	const [attemptsNumber, setAttemptsNumber] = useState<number>(0);
	const [seeScore, setSeeScore] = useState<boolean>(false);
	const dispatch = useDispatch<AppDispatch>();
	const {loading: loadingScore, error, scores} = useSelector<RootState, IScoreSate>(state => state.score);

	function prepareGame(boardSize: number, attemptsNumber: number) {
		if(boardSize && attemptsNumber) {
			setBoardSize(boardSize);
			setAttemptsNumber(attemptsNumber);
			setGameStart(true);
		} else {
			setBoardSize(0);
			setAttemptsNumber(0);
			setGameStart(false);
		}
	}

	function handleLogout() {
		dispatch(logout());
	}

	useEffect(() => {
		dispatch(getScores());
	}, [dispatch, seeScore]);

	if (loadingScore) return <p>Carregando dados...</p>
	if (error) return <p>Erro no processamento: {error}</p>

	return (
		<div className={styles.home}>
			<button onClick={handleLogout} className={styles.btn_logout}>Sair</button>
			{seeScore && scores ? (
				<Scores />
			) : (
				gameStart ? (
					<Game boardSize={boardSize} possibleAttemps={attemptsNumber} />
				) : (
					<>
					<GamePrep prepareGame={prepareGame}/>
					<button onClick={() => {setSeeScore(true)}} className={styles.btn_score}>Ver Pontuações</button>
					</>
				)
		  )}
		</div>
	)
}
export default HomeAuthorized
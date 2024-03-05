import styles from './HomeAuthorized.module.css';

import { useState } from "react"
import GamePrep from "../GamePrep/GamePrep";
import Game from "../Game/Game";
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { logout } from '../../Slices/AuthSlice';

function HomeAuthorized() {
	const [gameStart, setGameStart] = useState(false);
	const [boardSize, setBoardSize] = useState<number>(0);
	const [attemptsNumber, setAttemptsNumber] = useState<number>(0);
	const dispatch = useDispatch<AppDispatch>();

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

	return (
		<>
			<button onClick={handleLogout} className={styles.btn_logout}>Sair</button>
			{gameStart ? (
				<Game boardSize={boardSize} possibleAttemps={attemptsNumber}/>
			) : (
				<GamePrep prepareGame={prepareGame}/>
			)}
			
		</>
	)
}
export default HomeAuthorized
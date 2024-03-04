import { useState } from "react"
import GamePrep from "../GamePrep/GamePrep";
import Game from "../Game/Game";

function HomeAuthorized() {
	const [gameStart, setGameStart] = useState(false);
	const [boardSize, setBoardSize] = useState<number>(0);
	const [attemptsNumber, setAttemptsNumber] = useState<number>(0);

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

	return (
		<>
			{gameStart ? (
				<Game boardSize={boardSize} possibleAttemps={attemptsNumber}/>
			) : (
				<GamePrep prepareGame={prepareGame}/>
			)}
		</>
	)
}
export default HomeAuthorized
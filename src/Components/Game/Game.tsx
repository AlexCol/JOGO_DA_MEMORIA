import Card from '../Card/Card';
import styles from './Game.module.css';
import { useEffect, useState } from "react";
import confetti from 'canvas-confetti';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { IAuthSate } from '../../Slices/AuthSlice';
import { IScore } from '../../Interfaces/IScore';
import { newScore } from '../../Slices/ScoreSlice';

interface IGameProps {
	boardSize: number;
	possibleAttemps: number
}

function Game({boardSize, possibleAttemps}: IGameProps) {
	const navigate = useNavigate();
	
	const possibleFigures1 = ["🐵", "🐺", "🦊", "🦝", "🐴", "🐗", "🐭", "🐻", "🐔", "🐸"];
	const possibleFigures2 = ["💐", "🌸", "🏵️", "🌹", "❄️", "☄️", "🌩️", "🔥", "🌊", "🍂"];
	const possibleFigures3 = ["🔨", "🪓", "⛏️", "⚔️", "🧲", "⚖️", "🔬", "🧪", "🧼", "🩺"];
	const possibleFigures4 = ["♻️", "⚜️"];	
	const possibleFigures = possibleFigures1.concat(possibleFigures2).concat(possibleFigures3).concat(possibleFigures4);//+feito pra não quebrar a linha do editor
	
	const [gameImages, setGameImages] = useState<string[]>([]);
	const [findedImages, setFindedImages] = useState<string[]>([]);
	const [clearReveal, setClearReveal] = useState<boolean>(false);
	const [activeGame, setActiveGame] = useState<boolean>(false);
	const [defeat, setDefeat] = useState<boolean>(false);
	const [victory, setVictory] = useState<boolean>(false);
	const [points, setPoints] = useState<number>(0);
	const [tries, setTries] = useState<number>(0);
	const [firstPick, setFirstPick] = useState<{id: number, value: string}|null>(null);
	const [secondPick, setSecondPick] = useState<{id: number, value: string}|null>(null);
	const dispatch = useDispatch<AppDispatch>();
	const {authUser} = useSelector<RootState, IAuthSate>(state => state.auth);
		
	//! logica para o jogo  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function handleClick(index: number) {
		if(!activeGame) return;
		if(clearReveal) return;
		if(tries >= possibleAttemps) return;
		if(findedImages.some(f => f === gameImages[index])) return;
		if (firstPick?.id === index) return;

		if(!firstPick) {
			setFirstPick({id: index, value: gameImages[index]});
		} else if (!secondPick) {
			setSecondPick({id: index, value: gameImages[index]});
		}
	}

	useEffect(() => {
		if(!secondPick || !firstPick) return;

		if(firstPick.value === secondPick.value && firstPick.id !== secondPick.id) {
			setFindedImages([...findedImages, secondPick.value]);
			setFirstPick(null);
			setSecondPick(null);
		} else {
			setTries(tries+1);		
			setTimeout(() => {
				setFirstPick(null);
				setSecondPick(null);
			}, 2000);			
		}
	}, [secondPick]);

	//! bloco de finalização do jogo //////////////////////////////////////////////////////////////////////////////////////////////////////////////
	useEffect(() => {
		if(gameImages.length > 0 && findedImages.length === gameImages.length/2) {
			setVictory(true);
			setActiveGame(false);
		}
		if(tries >= possibleAttemps) {
			setDefeat(true);
			setActiveGame(false);
		}
	}, [tries, findedImages]);

	useEffect(() => {
		if(victory) {
			setPoints(points + (100 * boardSize * boardSize/2));
			confetti({
				angle: 270,
				particleCount: 600,
				origin: {x: 0.5, y:0},
				spread: 300
			});
		}
	}, [victory]);

	//! bloco de preparação do jogo //////////////////////////////////////////////////////////////////////////////////////////////////////////////
	useEffect(() => {
		if(clearReveal && !activeGame && (!victory && !defeat)) {
			prepareImages();
			setActiveGame(true);
			setTimeout(() => {					
				setClearReveal(false);
			}, 2000);
		}
		if(clearReveal && (victory || defeat)) { 
			setFindedImages([]);
			setFirstPick(null);
			setSecondPick(null);
			setDefeat(false);
			setVictory(false);
			setClearReveal(false);
		}
		if(!clearReveal) {
			setTimeout(() => {					
				if (!activeGame) setClearReveal(true);
			}, 2000);
		}
	}, [clearReveal]);
	
	function startNewGame() {
		setClearReveal(true);
	}

	useEffect(() => {
		setGameImages(() => []);
		for(let i = 0; i < boardSize*boardSize; i++) { //settin default value
			setGameImages(current => [...current, 'X']);
		};
	}, [])

	//! funcções auxiliares  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function gotToMainMenu() {
		saveGame();
		navigate('restart');
	}

	function saveGame() {
		if (points > 0) {
			authUser.UserName
			const score: IScore = {
				session: 1,
				userId: authUser.UserId,
				userName: authUser.UserName,
				points
			};
			dispatch(newScore(score));
		}
	}

	function prepareImages() {
		const selectedBaseImages = randomizePossibleFigures((boardSize*boardSize/2), possibleFigures);
		const duplicate = selectedBaseImages.concat(selectedBaseImages);
		const mixedImages = randomizeSelection(duplicate);
		setGameImages(mixedImages);
	}
	
	function randomizePossibleFigures(numberOfFigures: number, possibleFigures: string[]) {
		const selectedImages = [];
		let selectableFigues = possibleFigures;
		do {
			const randomIndex = Math.floor(Math.random() * selectableFigues.length);		
			const selectedFigure = selectableFigues.find((_, index) => index === randomIndex);
			selectableFigues = selectableFigues.filter((_, index) => index !== randomIndex);
			selectedImages.push(selectedFigure ?? '');
		} while (selectedImages.length < numberOfFigures);
		return selectedImages;
	}

	function randomizeSelection(images: string[]) {
		for (let i = images.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[images[i], images[j]] = [images[j], images[i]];
		};
		return images;
	}

 //! 'mesa de jogo' //////////////////////////////////////////////////////////////////////////////////////////////////////////////
	return (
		<div className={styles.game}>			
			<h3>Tentativas restantes: {possibleAttemps-tries}</h3>
			<h4>Pontuação atual: {points}</h4>
			<div className={styles.board} style={{gridTemplateColumns: `repeat(${boardSize * 2}, 6em)`}}>
				{gameImages.map((value, index) => {
					return (
						<div key={index} onClick={() => handleClick(index)} >
							<Card
								key={index}
								id={index}
								value={value}
								clearReveal={clearReveal}
								pair={[firstPick, secondPick]}
							/>
						</div>
					)
				})}
			</div>
			{victory && (
				<>
					<p>Parabens! Voce venceu!</p>
					<p>Gostaria de iniciar uma nova partida?</p>
					<button onClick={startNewGame}>Jogar Novamente</button>
					<p>Ou encerrar e voltar ao menu?</p>
					<button onClick={gotToMainMenu}>Menu inicial</button>
				</>
			)}
			{defeat && (
				<>
					<p>Fim de jogo!</p>
					<p>Gostaria de iniciar uma nova partida?</p>
					<button onClick={gotToMainMenu}>Menu inicial</button>
				</>
			)}
		</div>
	)
}

export default Game
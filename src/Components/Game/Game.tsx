import { render } from 'react-dom';
import Card from '../Card/Card';
import styles from './Game.module.css';
import { useEffect, useState } from "react";
import confetti from 'canvas-confetti';

interface IGameProps {
	boardSize: number;
	possibleAttemps: number
}

function Game({boardSize, possibleAttemps}: IGameProps) {
	const possibleFigures1 = ["🐵", "🐺", "🦊", "🦝", "🐴", "🐗", "🐭", "🐻", "🐔", "🐸"];
	const possibleFigures2 = ["💐", "🌸", "🏵️", "🌹", "❄️", "☄️", "🌩️", "🔥", "🌊", "🍂"];
	const possibleFigures3 = ["🔨", "🪓", "⛏️", "⚔️", "🧲", "⚖️", "🔬", "🧪", "🧼", "🩺"];
	const possibleFigures4 = ["♻️", "⚜️"];
	//+feito pra não quebrar a linha do editor
	const possibleFigures = possibleFigures1.concat(possibleFigures2).concat(possibleFigures3).concat(possibleFigures4);
	const [gameImages, setGameImages] = useState<string[]>([]);
	const [findedImages, setFindedImages] = useState<string[]>([]);
	const [tries, setTries] = useState<number>(0);
	const [firstPick, setFirstPick] = useState<{id: number, value: string}|null>(null);
	const [secondPick, setSecondPick] = useState<{id: number, value: string}|null>(null);
	const [endGame, setEndGame] = useState<boolean>(false);
	const [victory, setVictory] = useState<boolean>(false);
	const [clearReveal, setClearReveal] = useState<boolean>(false);
	const [points, setPoints] = useState<number>(0);
		
	//! logica para o jogo  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function handleClick(index: number) {
		if(endGame) return;
		if(clearReveal) return;
		if(findedImages.some(f => f === gameImages[index])) return;
		if (firstPick?.id === index) {
			return;
		}

		if(!firstPick) {
			setFirstPick({id: index, value: gameImages[index]});
		} else if (!secondPick) {
			setSecondPick({id: index, value: gameImages[index]});
		}
	}

	useEffect(() => {
		if(!secondPick) return;
		if(!firstPick) return;

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
		}
	}, [findedImages]);

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
	}, [victory])

	useEffect(() => {
		if(tries >= possibleAttemps) {
			setEndGame(true);
		}
	}, [tries]);


		//! reincia o jogo //////////////////////////////////////////////////////////////////////////////////////////////////////////////
		function startNewGame() {
			prepareImages();
			
			setFindedImages([]);
			setFirstPick(null);
			setSecondPick(null);
			setEndGame(false);
			setVictory(false);
		}
	
		useEffect(() => {
			if (clearReveal) {
				setTimeout(() => {
					setClearReveal(false);
				}, 2000);
			}
		}, [clearReveal])

	//! bloco de preparação do jogo //////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

	function prepareImages() {
		const selectedBaseImages = randomizePossibleFigures((boardSize*boardSize/2), possibleFigures);
		const duplicate = selectedBaseImages.concat(selectedBaseImages);
		const mixedImages = randomizeSelection(duplicate);
		setGameImages(mixedImages);
		setClearReveal(true);
	}
	
	useEffect(() => {
		prepareImages()
	}, [])

	return (
		<div className={styles.game}>			
			<h3>Tentativas restantes: {possibleAttemps-tries}</h3>
			<h4>Pontuação atual: {points}</h4>
			<div className={styles.board}>
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
					<p>Gostaria de inciiar uma nova partida ou encerrar e salvar sua pontução?</p>
					<button onClick={startNewGame}>Jogar Novamente</button>
				</>
			)}
		</div>	
	)
}

export default Game

import styles from './GamePre.module.css';
import { FormEvent, MutableRefObject, useContext, useRef } from "react";
import { AuthContext } from "../../Context/AuthContext";

interface IGamePrepProps {
	prepareGame: Function
}

function GamePrep({prepareGame} : IGamePrepProps) {
	const {user} = useContext(AuthContext);
	const boardSizes = [2, 4, 6, 8];
	const boardSizesDesc = ['Pequeno (2 pares)', 'Medio (8 pares)', 'Grande (18 pares)', 'Muito Grande (32 pares)'];
	const colorSizeChoices = ['blue', 'green', 'yellow', 'red'];
	const possibleAttemps = [4, 6, 8, 10];
	const colorAttemptChoices = ['red', 'yellow', 'green', 'blue'];

	const sizeRef = useRef<HTMLInputElement[]>([]) as MutableRefObject<HTMLInputElement[]>;
	const attemptRef = useRef<HTMLInputElement[]>([]) as MutableRefObject<HTMLInputElement[]>;
	
	
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const selectedSize = sizeRef.current.find(r => r.checked)?.value;
		const selectedAttemp = attemptRef.current.find(r => r.checked)?.value;
		if(!selectedSize && !selectedAttemp) {
			alert("Ocorreu um erro, tente novamente. Se o erro persistir, atualize a pagina.");
		}
		
		prepareGame(
			selectedSize,
			selectedAttemp
		);
	}
	
	return (
		<div className={styles.main}>
			
			<h2>Olá {user}</h2>
			<h3>Antes de iniciar, por favor escolha o tamanho do tabuleiro, e quantidade de tentativas desejada.</h3>
			<form onSubmit={handleSubmit}>
				<div className={styles.sizeContainer}>
					<h4>Tamanho:</h4>
					{boardSizes.map((size, index) =>
					<label key={size} htmlFor={"board"+index}>
						<input 
							type="radio" 
							id={"board"+index}
							defaultChecked={index === 0 ? true : false}
							ref={el => {
								if(el)
									sizeRef.current[index] = el
							}}
							className={styles[colorSizeChoices[index]]}
							name="boardSize"
							value={size} />
						<span> {boardSizesDesc[index]} </span>
					</label>
					)}
				</div>

				<div className={styles.attemptContainer}>
					<h4>Tentativas:</h4>
					{possibleAttemps.map((atempt, index) =>
					<label key={atempt} htmlFor={"atempt"+index}>
						<input 
							type="radio" 
							id={"atempt"+index}
							defaultChecked={index === possibleAttemps.length-1 ? true : false}
							ref={el => {
								if(el)
								attemptRef.current[index] = el
							}}
							className={styles[colorAttemptChoices[index]]}
							name="atemptChoice"
							value={atempt} />
						<span> {atempt.toString().padStart(2, '0')}</span>
					</label>
					)}
				</div>
				<button type="submit">Iniciar</button>
			</form>
		</div>
	)
}
export default GamePrep
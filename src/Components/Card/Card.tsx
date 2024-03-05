import { useEffect, useState } from 'react';
import styles from './Card.module.css';

interface ICardProp {
	id: number,
	value:string;
	pair: ({id: number, value: string}|null) [],
	clearReveal: boolean
}

function Card({id, value, clearReveal, pair}: ICardProp) {
	const [finded, setFinded] = useState<boolean>(false);
	const [rotate, setRotate] = useState<boolean>(false);

	useEffect(() => {
		setRotate(pair.some(p => p?.id === id));
		if(!finded) {
			setFinded(
				pair.every(p => p?.value === value)
				&& pair.some(p => p?.id === id)
				&& pair.some(p => p?.id !== id)
			);
		}
	},[pair]);

	useEffect(() => {
		setFinded(clearReveal);
	}, [clearReveal])

	return (
		<div className={styles.card_container}>
  		<div className={`${styles.card} ${(finded || rotate) ? styles.rotate : ''}`}>
				<div className={styles.back}>{value}</div>
				<div className={styles.front}>Y</div>
  		</div>
		</div>
	)
}
export default Card
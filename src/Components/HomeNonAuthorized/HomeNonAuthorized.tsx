import { encrypt } from '../../Pages/Utils/Crypto';
import styles from './HomeNonAuthorized.module.css';

function HomeNonAuthorized() {
	const originPath = encrypt(window.location.origin);
	return (
		<div className={styles.notLoged}>
			<h1>Bem vindo!</h1>
			<h3>Para jogar, por favor realize o login no link abaixo!</h3>
			<a href={`http://localhost:3011/login?o=${originPath}`}>Entrar</a>
		</div>
	)
}
export default HomeNonAuthorized
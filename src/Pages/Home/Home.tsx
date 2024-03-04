import { useContext } from "react"
import { AuthContext } from "../../Context/AuthContext"
import HomeNonAuthorized from "../../Components/HomeNonAuthorized/HomeNonAuthorized";

function Home() {
	const auth = useContext(AuthContext);

	return (
		auth ? (
			<p>Pode entrar</p>
		) : (
			<HomeNonAuthorized />
		)
	)
}
export default Home
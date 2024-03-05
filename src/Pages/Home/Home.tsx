import { useContext } from "react"
import { AuthContext } from "../../Context/AuthContext"
import HomeNonAuthorized from "../../Components/HomeNonAuthorized/HomeNonAuthorized";
import HomeAuthorized from "../../Components/HomeAuthorized/HomeAuthorized";

function Home() {
	const {auth} = useContext(AuthContext);

	return (
		auth ? (
			<HomeAuthorized />
		) : (
			<HomeNonAuthorized />
		)
	)
}
export default Home
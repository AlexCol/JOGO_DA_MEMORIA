
import './App.css'
import AppRoutes from './Components/AppRoutes/AppRoutes';
import { AuthProvider } from './Context/AuthContext'
import useAuth from './Hooks/useAuth'
import { encrypt } from './Utils/Crypto';

function App() {
  const {auth, user, loading, error} = useAuth();
	
	if(loading) return <p>Carregando...</p>;
	if(error.length > 0) return ( //seja uma boa ideia componentizer essa parte
		<>
		<p>Ocorreu um erro no processamento!</p>
		<p>{error}</p>
		<a href={`https://telas-autenticador-react-two.vercel.app/?o=${encrypt(window.location.origin)}`}>Logar novamente</a>
		</>
	);

  return (    
		<AuthProvider value={{auth, user}}>
			<AppRoutes/>
		</AuthProvider>
  )
}

export default App

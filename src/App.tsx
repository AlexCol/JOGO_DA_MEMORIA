import './App.css'
import AppRoutes from './Components/AppRoutes/AppRoutes';
import { AuthProvider } from './Context/AuthContext'
import useAuth from './Hooks/useAuth'

function App() {
  const {auth, loading} = useAuth();
	
	if(loading) return <p>Carregando...</p>;

  return (
    <AuthProvider value={auth}>
			<AppRoutes/>
		</AuthProvider>
  )
}

export default App

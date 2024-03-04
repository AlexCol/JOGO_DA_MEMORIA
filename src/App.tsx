import './App.css'
import AppRoutes from './Components/AppRoutes/AppRoutes';
import { AuthProvider } from './Context/AuthContext'
import useAuth from './Hooks/useAuth'

function App() {
  const {auth, user, loading} = useAuth();
	
	if(loading) return <p>Carregando...</p>;

  return (
    <AuthProvider value={{auth, user}}>
			<AppRoutes/>
		</AuthProvider>
  )
}

export default App

import { useEffect, useState } from "react";

const token = new URL(window.location.href).searchParams.get('t');

function useAuth() {
	const [auth, setAuth] = useState<boolean>(false);
	const [user, setUser] = useState<string>('');
	const [loading, setLoading] = useState(true);

	
	useEffect(() => {
		const firstValidation = async() => {
			setLoading(true);
			if(token) {
				localStorage.setItem('accessToken', token);
			}
			await validateToken();			
			setLoading(false);
		}
		firstValidation();		
	}, []);

	async function validateToken() {
		const accessToken = localStorage.getItem('accessToken');
		if (!accessToken) {
			setAuth(false);
			setUser('');
			setLoading(false);	
			return;
		};		
		try {
			// await new Promise<void>((resolve) => { //substituir pela chamada a api
			// 	setTimeout(() => {
			// 		console.log("consulting api");
			// 		resolve();
			// 	}, 2000);
			// });
			setAuth(true);
			setUser('Alexandre');
		} catch {
			localStorage.removeItem('accessToken');
			setAuth(false);
			setUser('');
		};
		setLoading(false);
	};	
	
	async function handleLocalStorageChange() {
		await validateToken();
	}

	async function localStorageFromOtherTabs(event: StorageEvent) {
		if (event.key === 'accessToken') {
			await validateToken();
		}
	}
	//! Efeito para adicionar e remover os listeners de eventos de alteração no localStorage
	useEffect(() => {
		window.addEventListener('storage', localStorageFromOtherTabs);
		window.addEventListener('localStorageChange', handleLocalStorageChange);
		return () => {
			window.removeEventListener('storage', localStorageFromOtherTabs);	
			window.removeEventListener('localStorageChange', handleLocalStorageChange);
		};
	}, []);
	
	return {auth, user, loading};
}
export default useAuth
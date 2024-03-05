import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { IAuthSate, checkAuth } from "../Slices/AuthSlice";

const token = new URL(window.location.href).searchParams.get('t');

function useAuth() {
	const [auth, setAuth] = useState<boolean>(false);
	const [user, setUser] = useState<string>('');
	const dispatch = useDispatch<AppDispatch>();
	const {authUser, success, loading, error} = useSelector<RootState, IAuthSate>(state => state.auth);
	
	useEffect(() => {
		const firstValidation = async() => {
			if(token) {
				localStorage.setItem('accessToken', token);
			}
			await validateToken();			
		}
		firstValidation();		
	}, []);

	async function validateToken() {
		const accessToken = localStorage.getItem('accessToken');
		if (!accessToken) {
			setAuth(false);
			setUser('');
			return;
		};		
		try {
			dispatch(checkAuth());
		} catch {
			localStorage.removeItem('accessToken');
			setAuth(false);
			setUser('');
		};
	};	

	useEffect(() => {
		if(!loading) {
			setAuth(success);
			setUser(authUser.UserName);
		}
	}, [authUser, loading]);
	
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
	
	return {auth, user, loading, error};
}
export default useAuth
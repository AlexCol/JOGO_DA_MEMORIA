import { ReactNode, createContext, useContext } from "react";

interface IAuthContext {
	auth: boolean,
	user: string
};
export const AuthContext = createContext<IAuthContext>({auth: false, user: ''});


export function AuthProvider(    
	{ children, value }: { children: ReactNode, value: IAuthContext } 
) {
	return (
		<AuthContext.Provider value={value}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuthValue() {
	return useContext(AuthContext);
}
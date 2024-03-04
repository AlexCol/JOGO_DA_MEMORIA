import { ReactNode, createContext, useContext } from "react";


export const AuthContext = createContext<boolean>(false);

export function AuthProvider(    
	{ children, value }: { children: ReactNode, value: boolean } 
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
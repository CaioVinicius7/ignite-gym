import { createContext, ReactNode } from "react";

import { UserDTO } from "@dtos/UserDTO";
export interface AuthContextDataProps {
	user: UserDTO;
}

interface AuthContextProviderProps {
	children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>(
	{} as AuthContextDataProps
);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
	return (
		<AuthContext.Provider
			value={{
				user: {
					id: "95f53675-2ebd-4a20-a3cc-7cc779bcc95c",
					name: "Caio Vinícius",
					email: "caio@gmail.com",
					avatar: "caio.png"
				}
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

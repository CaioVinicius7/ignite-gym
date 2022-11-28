import { createContext } from "react";

import { UserDTO } from "@dtos/UserDTO";
export interface AuthContextDataProps {
	user: UserDTO;
}

export const AuthContext = createContext<AuthContextDataProps>(
	{} as AuthContextDataProps
);

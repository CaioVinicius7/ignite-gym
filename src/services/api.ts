import axios, { AxiosInstance } from "axios";

import { AppError } from "@utils/AppError";

type signOut = () => void;

interface APIInstanceProps extends AxiosInstance {
	registerInterceptTokenManager: (signOut: signOut) => () => void;
}

const api = axios.create({
	baseURL: process.env.BASE_URL as string
}) as APIInstanceProps;

api.registerInterceptTokenManager = (signOut) => {
	const interceptTokenManager = api.interceptors.response.use(
		(response) => response,
		(error) => {
			if (error.response && error.response.data) {
				return Promise.reject(new AppError(error.response.data.message));
			}

			return Promise.reject(new AppError(error));
		}
	);

	return () => {
		api.interceptors.response.eject(interceptTokenManager);
	};
};

export { api };

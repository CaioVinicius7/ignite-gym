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
		(requestError) => {
			if (requestError?.response?.status === 401) {
				if (
					requestError.response.data?.message === "token.expired" ||
					requestError.response.data?.message === "token.invalid"
				) {
				}

				signOut();
			}

			if (requestError.response && requestError.response.data) {
				return Promise.reject(new AppError(requestError.response.data.message));
			}

			return Promise.reject(new AppError(requestError));
		}
	);

	return () => {
		api.interceptors.response.eject(interceptTokenManager);
	};
};

export { api };

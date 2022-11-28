import axios from "axios";

const api = axios.create({
	baseURL: "http://192.168.0.137:3333"
});

api.interceptors.request.use(
	(config) => {
		console.log("INTERCEPTOR REQUEST:", config);
		return config;
	},
	(error) => {
		console.log("INTERCEPTOR REQUEST ERROR:", error);

		return Promise.reject(error);
	}
);

api.interceptors.response.use(
	(response) => {
		console.log("INTERCEPTOR RESPONSE:", response);

		return response;
	},
	(error) => {
		console.log("INTERCEPTOR RESPONSE ERROR:", error);

		return Promise.reject(error);
	}
);

export { api };

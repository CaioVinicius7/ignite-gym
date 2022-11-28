import { StatusBar } from "react-native";
import { NativeBaseProvider } from "native-base";
import {
	useFonts,
	Roboto_400Regular,
	Roboto_700Bold
} from "@expo-google-fonts/roboto";

import { Routes } from "@routes/index";

import { Loading } from "@components/Loading";

import { THEME } from "./src/theme";
import { AuthContext } from "@contexts/AuthContext";

export default function App() {
	const [fontsLoaded] = useFonts({
		Roboto_400Regular,
		Roboto_700Bold
	});

	return (
		<NativeBaseProvider theme={THEME}>
			<StatusBar
				barStyle="light-content"
				backgroundColor="transparent"
				translucent
			/>

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
				{fontsLoaded ? <Routes /> : <Loading />}
			</AuthContext.Provider>
		</NativeBaseProvider>
	);
}

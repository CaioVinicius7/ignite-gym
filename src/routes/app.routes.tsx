import { useTheme } from "native-base";
import {
	createBottomTabNavigator,
	BottomTabNavigationProp
} from "@react-navigation/bottom-tabs";

import { Home } from "@screens/Home";
import { History } from "@screens/History";
import { Profile } from "@screens/Profile";
import { Exercise } from "@screens/Exercise";

import HomeSvg from "../assets/home.svg";
import HistorySvg from "../assets/history.svg";
import ProfileSvg from "../assets/profile.svg";

type AppRoutes = {
	home: undefined;
	exercise: undefined;
	history: undefined;
	profile: undefined;
};

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export function AppRoutes() {
	const { sizes, colors } = useTheme();

	const iconsSizes = sizes[6];

	return (
		<Navigator
			screenOptions={{
				headerShown: false,
				tabBarShowLabel: false,
				tabBarActiveTintColor: colors.green[500],
				tabBarInactiveTintColor: colors.gray[200]
			}}
		>
			<Screen
				name="home"
				component={Home}
				options={{
					tabBarIcon: ({ color }) => (
						<HomeSvg fill={color} width={iconsSizes} height={iconsSizes} />
					)
				}}
			/>

			<Screen
				name="history"
				component={History}
				options={{
					tabBarIcon: ({ color }) => (
						<HistorySvg fill={color} width={iconsSizes} height={iconsSizes} />
					)
				}}
			/>

			<Screen
				name="profile"
				component={Profile}
				options={{
					tabBarIcon: ({ color }) => (
						<ProfileSvg fill={color} width={iconsSizes} height={iconsSizes} />
					)
				}}
			/>

			<Screen name="exercise" component={Exercise} />
		</Navigator>
	);
}

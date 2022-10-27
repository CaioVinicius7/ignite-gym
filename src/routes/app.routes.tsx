import {
	createBottomTabNavigator,
	BottomTabNavigationProp
} from "@react-navigation/bottom-tabs";

import { Home } from "@screens/Home";
import { History } from "@screens/History";
import { Profile } from "@screens/Profile";
import { Exercise } from "@screens/Exercise";

type AppRoutes = {
	home: undefined;
	exercise: undefined;
	history: undefined;
	profile: undefined;
};

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export function AppRoutes() {
	return (
		<Navigator>
			<Screen name="home" component={Home} />
			<Screen name="exercise" component={Exercise} />
			<Screen name="history" component={History} />
			<Screen name="profile" component={Profile} />
		</Navigator>
	);
}

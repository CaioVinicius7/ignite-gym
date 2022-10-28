import { HStack, VStack, FlatList, Heading, Text } from "native-base";

import { HomeHeader } from "@components/HomeHeader";
import { Group } from "@components/Group";
import { useState } from "react";

export function Home() {
	const [groups, setGroups] = useState([
		"costas",
		"bíceps",
		"triceps",
		"ombro"
	]);
	const [groupSelected, setGroupSelected] = useState("costas");

	return (
		<VStack flex={1}>
			<HomeHeader />

			<FlatList
				data={groups}
				keyExtractor={(item) => item}
				renderItem={({ item }) => (
					<Group
						name={item}
						isActive={groupSelected === item}
						onPress={() => setGroupSelected(item)}
					/>
				)}
				horizontal
				showsHorizontalScrollIndicator={false}
				_contentContainerStyle={{
					px: 8
				}}
				my={10}
				maxH={10}
			/>

			<VStack flex={1} px={8} mb={5}>
				<HStack justifyContent="space-between">
					<Heading color="gray.200" fontSize="md">
						Exercícios
					</Heading>

					<Text color="gray.200" fontSize="sm">
						4
					</Text>
				</HStack>
			</VStack>
		</VStack>
	);
}

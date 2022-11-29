import { useState, useEffect, useCallback } from "react";
import { HStack, VStack, FlatList, Heading, Text, useToast } from "native-base";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import { AppNavigatorRoutesProps } from "@routes/app.routes";

import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { ExerciseCard } from "@components/ExerciseCard";
import { Loading } from "@components/Loading";

import { api } from "@services/api";

import { ExerciseDTO } from "@dtos/ExerciseDTO";

import { AppError } from "@utils/AppError";

export function Home() {
	const [isLoading, setIsLoading] = useState(true);
	const [groups, setGroups] = useState<string[]>([]);
	const [exercises, setExercises] = useState<ExerciseDTO[]>([]);
	const [groupSelected, setGroupSelected] = useState("antebraço");

	const toast = useToast();

	const navigation = useNavigation<AppNavigatorRoutesProps>();

	function handleOpenExerciseDetails(exerciseId: string) {
		navigation.navigate("exercise", {
			exerciseId
		});
	}

	async function fetchGroups() {
		try {
			const response = await api.get("/groups");

			setGroups(response.data);
		} catch (error) {
			const isAppError = error instanceof AppError;

			const title = isAppError
				? error.message
				: "Não foi possível carregar os grupos musculares.";

			toast.show({
				title,
				placement: "top",
				bgColor: "red.500"
			});
		}
	}

	async function fetchExercisesByGroup() {
		try {
			setIsLoading(true);

			const response = await api.get(`/exercises/bygroup/${groupSelected}`);

			setExercises(response.data);
		} catch (error) {
			const isAppError = error instanceof AppError;

			const title = isAppError
				? error.message
				: "Não foi possível carregar os exercícios.";

			toast.show({
				title,
				placement: "top",
				bgColor: "red.500"
			});
		} finally {
			setIsLoading(false);
		}
	}

	const noExerciseInCurrentGroup = exercises.length === 0;

	useEffect(() => {
		fetchGroups();
	}, []);

	useFocusEffect(
		useCallback(() => {
			fetchExercisesByGroup();
		}, [groupSelected])
	);

	return (
		<VStack flex={1}>
			<HomeHeader />

			<FlatList
				data={groups}
				keyExtractor={(item) => item}
				renderItem={({ item }) => (
					<Group
						name={item}
						isActive={
							groupSelected.toLocaleUpperCase() === item.toLocaleUpperCase()
						}
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
				minH={10}
			/>

			{isLoading ? (
				<Loading />
			) : noExerciseInCurrentGroup ? (
				<Text
					color="gray.200"
					fontSize="md"
					fontFamily="body"
					textAlign="center"
					px={8}
				>
					Parece que você não tem nenhum exercício para esse grupo muscular.
				</Text>
			) : (
				<VStack flex={1} px={8}>
					<HStack justifyContent="space-between" mb={5}>
						<Heading color="gray.200" fontSize="md" fontFamily="heading">
							Exercícios
						</Heading>

						<Text color="gray.200" fontSize="sm">
							{exercises.length}
						</Text>
					</HStack>

					<FlatList
						data={exercises}
						keyExtractor={(item) => item.id}
						renderItem={({ item }) => (
							<ExerciseCard
								data={item}
								onPress={() => handleOpenExerciseDetails(item.id)}
							/>
						)}
						showsVerticalScrollIndicator={false}
						_contentContainerStyle={{ paddingBottom: 20 }}
					/>
				</VStack>
			)}
		</VStack>
	);
}

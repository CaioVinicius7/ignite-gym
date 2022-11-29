import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import {
	Box,
	Heading,
	HStack,
	Icon,
	Image,
	ScrollView,
	Text,
	VStack,
	useToast
} from "native-base";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

import { AppNavigatorRoutesProps } from "@routes/app.routes";

import { Button } from "@components/Button";

import { ExerciseDTO } from "@dtos/ExerciseDTO";

import { api } from "@services/api";

import { AppError } from "@utils/AppError";

import BodySvg from "@assets/body.svg";
import SeriesSvg from "@assets/series.svg";
import RepetitionsSvg from "@assets/repetitions.svg";

interface RouteParamsProps {
	exerciseId: string;
}

export function Exercise() {
	const [exercise, setExercise] = useState<ExerciseDTO>({} as ExerciseDTO);

	const navigation = useNavigation<AppNavigatorRoutesProps>();

	const route = useRoute();

	const { exerciseId } = route.params as RouteParamsProps;

	const toast = useToast();

	function handleGoBack() {
		navigation.goBack();
	}

	async function fetchExerciseDetails() {
		try {
			const response = await api.get(`/exercises/${exerciseId}`);

			setExercise(response.data);
		} catch (error) {
			const isAppError = error instanceof AppError;

			const title = isAppError
				? error.message
				: "Não foi possível carregar os detalhes do exercício.";

			toast.show({
				title,
				placement: "top",
				bgColor: "red.500"
			});
		} finally {
		}
	}

	useEffect(() => {
		fetchExerciseDetails();
	}, [exerciseId]);

	return (
		<VStack flex={1}>
			<VStack px={8} pt={12} bg="gray.600">
				<TouchableOpacity onPress={handleGoBack}>
					<Icon as={Feather} name="arrow-left" color="green.500" size={6} />
				</TouchableOpacity>

				<HStack
					justifyContent="space-between"
					mt={4}
					mb={8}
					alignItems="center"
				>
					<Heading
						color="gray.100"
						fontSize="lg"
						fontFamily="heading"
						flexShrink={1}
					>
						{exercise.name}
					</Heading>

					<HStack alignItems="center">
						<BodySvg />

						<Text color="gray.200" ml={1} textTransform="capitalize">
							{exercise.group}
						</Text>
					</HStack>
				</HStack>
			</VStack>

			<ScrollView>
				<VStack p={8}>
					<Box rounded="lg" mb={3} overflow="hidden">
						<Image
							w="full"
							h={80}
							source={{
								uri: `${api.defaults.baseURL}/exercise/demo/${exercise?.demo}`
							}}
							alt="Nome do exercício"
							resizeMode="cover"
							rounded="lg"
						/>
					</Box>

					<Box bg="gray.600" rounded="md" pb={4} px={4}>
						<HStack
							alignItems="center"
							justifyContent="space-between"
							mb={6}
							mt={5}
						>
							<HStack>
								<SeriesSvg />
								<Text color="gray.200" ml={2}>
									{exercise.series} séries
								</Text>
							</HStack>

							<HStack>
								<RepetitionsSvg />
								<Text color="gray.200" ml={2}>
									{exercise.repetitions} repetições
								</Text>
							</HStack>
						</HStack>

						<Button title="Marcar como realizado" />
					</Box>
				</VStack>
			</ScrollView>
		</VStack>
	);
}

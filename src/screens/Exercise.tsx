import { TouchableOpacity } from "react-native";
import {
	Box,
	Heading,
	HStack,
	Icon,
	Image,
	ScrollView,
	Text,
	VStack
} from "native-base";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

import { AppNavigatorRoutesProps } from "@routes/app.routes";

import { Button } from "@components/Button";

import BodySvg from "@assets/body.svg";
import SeriesSvg from "@assets/series.svg";
import RepetitionsSvg from "@assets/repetitions.svg";

interface RouteParamsProps {
	exerciseId: string;
}

export function Exercise() {
	const navigation = useNavigation<AppNavigatorRoutesProps>();

	const route = useRoute();

	const { exerciseId } = route.params as RouteParamsProps;

	console.log(exerciseId);

	function handleGoBack() {
		navigation.goBack();
	}

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
						Puxada frontal
					</Heading>

					<HStack alignItems="center">
						<BodySvg />

						<Text color="gray.200" ml={1} textTransform="capitalize">
							Costas
						</Text>
					</HStack>
				</HStack>
			</VStack>

			<ScrollView>
				<VStack p={8}>
					<Image
						source={{
							uri: "http://conteudo.imguol.com.br/c/entretenimento/0c/2019/12/03/remada-unilateral-com-halteres-1575402100538_v2_600x600.jpg"
						}}
						alt="Nome do exercício"
						w="full"
						h={80}
						mb={3}
						resizeMode="cover"
						rounded="lg"
					/>

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
									3 séries
								</Text>
							</HStack>

							<HStack>
								<RepetitionsSvg />
								<Text color="gray.200" ml={2}>
									12 repetições
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

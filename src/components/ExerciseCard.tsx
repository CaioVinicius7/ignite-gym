import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Heading, HStack, Image, Text, VStack, Icon } from "native-base";
import { Entypo } from "@expo/vector-icons";

import { ExerciseDTO } from "@dtos/ExerciseDTO";

interface ExerciseCardProps extends TouchableOpacityProps {
	data: ExerciseDTO;
}

export function ExerciseCard({ data, ...props }: ExerciseCardProps) {
	return (
		<TouchableOpacity {...props}>
			<HStack
				bg="gray.500"
				alignItems="center"
				rounded="md"
				p={2}
				pr={4}
				mb={3}
			>
				<Image
					source={{
						uri: "http://conteudo.imguol.com.br/c/entretenimento/0c/2019/12/03/remada-unilateral-com-halteres-1575402100538_v2_600x600.jpg"
					}}
					alt="Imagem do exercício"
					w={16}
					h={16}
					rounded="md"
					mr={4}
					resizeMode="cover"
				/>

				<VStack flex={1}>
					<Heading color="white" fontSize="lg" fontFamily="heading">
						{data.name}
					</Heading>

					<Text color="gray.200" fontSize="sm" mt={1} numberOfLines={2}>
						{data.series} séries x {data.repetitions} repetições
					</Text>
				</VStack>

				<Icon as={Entypo} name="chevron-thin-right" color="gray.300" />
			</HStack>
		</TouchableOpacity>
	);
}

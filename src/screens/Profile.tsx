import { useState } from "react";
import { TouchableOpacity } from "react-native";
import {
	Center,
	ScrollView,
	VStack,
	Skeleton,
	Text,
	Heading,
	useToast
} from "native-base";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

import { useAuth } from "@hooks/useAuth";

import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

const PHOTO_SIZE = 33;

type FormDataProps = {
	name: string;
	email: string;
	oldPassword: string;
	password: string;
	confirmPassword: string;
};

const profileSchema = yup.object({
	name: yup
		.string()
		.required("Informe o nome.")
		.min(3, "O nome precisa ter pelo menos 3 dígitos."),
	password: yup
		.string()
		.min(6, "A senha deve ter pelo menos 6 dígitos.")
		.nullable()
		.transform((value) => (!!value ? value : null)),
	confirmPassword: yup
		.string()
		.nullable()
		.transform((value) => (!!value ? value : null))
		.oneOf([yup.ref("password"), null], "A confirmação de senha não confere.")
		.when("password", {
			is: (Field: any) => Field,
			then: yup.string().nullable().required("Informe a confirmação da senha.")
		})
});

export function Profile() {
	const [photoIsLoading, setPhotoIsLoading] = useState(false);
	const [userPhoto, setUserPhoto] = useState(
		"https://github.com/caiovinicius7.png"
	);

	const toast = useToast();

	const { user } = useAuth();

	const {
		control,
		handleSubmit,
		formState: { errors }
	} = useForm<FormDataProps>({
		defaultValues: {
			name: user.name,
			email: user.email
		},
		resolver: yupResolver(profileSchema)
	});

	async function handleUserPhotoSelect() {
		setPhotoIsLoading(true);

		try {
			const photoSelected = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				quality: 1,
				aspect: [4, 4],
				allowsEditing: true
			});

			if (photoSelected.cancelled) {
				return;
			}

			if (photoSelected.uri) {
				const photoInfo = await FileSystem.getInfoAsync(photoSelected.uri);

				if (photoInfo.size && photoInfo.size / 1024 / 1024 > 3) {
					return toast.show({
						title: "Essa imagem é muito grande. Escolha uma de até 3MB.",
						placement: "bottom",
						bgColor: "red.500"
					});
				}

				setUserPhoto(photoSelected.uri);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setPhotoIsLoading(false);
		}
	}

	async function handleProfileUpdate(data: FormDataProps) {
		console.log(JSON.stringify(data, null, 2));
	}

	return (
		<VStack flex={1}>
			<ScreenHeader title="Perfil" />

			<ScrollView
				contentContainerStyle={{
					paddingBottom: 36
				}}
			>
				<Center mt={6} px={10}>
					{photoIsLoading ? (
						<Skeleton
							w={PHOTO_SIZE}
							h={PHOTO_SIZE}
							rounded="full"
							startColor="gray.500"
							endColor="gray.400"
						/>
					) : (
						<UserPhoto
							source={{
								uri: userPhoto
							}}
							size={PHOTO_SIZE}
						/>
					)}

					<TouchableOpacity onPress={handleUserPhotoSelect}>
						<Text
							color="green.500"
							fontWeight="bold"
							fontSize="md"
							mt={2}
							mb={8}
						>
							Alterar foto
						</Text>
					</TouchableOpacity>

					<Controller
						control={control}
						name="name"
						render={({ field: { value, onChange } }) => (
							<Input
								placeholder="Nome"
								bg="gray.600"
								onChangeText={onChange}
								value={value}
								errorMessage={errors.name?.message}
							/>
						)}
					/>

					<Controller
						control={control}
						name="email"
						render={({ field: { value } }) => (
							<Input
								placeholder="E-mail"
								bg="gray.600"
								value={value}
								isDisabled
							/>
						)}
					/>

					<Heading
						color="gray.200"
						fontSize="md"
						fontFamily="heading"
						mb={2}
						alignSelf="flex-start"
						mt={12}
					>
						Alterar senha
					</Heading>

					<Controller
						control={control}
						name="oldPassword"
						render={({ field: { onChange } }) => (
							<Input
								placeholder="Senha antiga"
								bg="gray.600"
								onChangeText={onChange}
								secureTextEntry
								errorMessage={errors.oldPassword?.message}
							/>
						)}
					/>

					<Controller
						control={control}
						name="password"
						render={({ field: { onChange } }) => (
							<Input
								placeholder="Nova senha"
								bg="gray.600"
								onChangeText={onChange}
								secureTextEntry
								errorMessage={errors.password?.message}
							/>
						)}
					/>

					<Controller
						control={control}
						name="confirmPassword"
						render={({ field: { onChange } }) => (
							<Input
								placeholder="Confirme a nova senha"
								bg="gray.600"
								onChangeText={onChange}
								secureTextEntry
								errorMessage={errors.confirmPassword?.message}
							/>
						)}
					/>

					<Button
						title="Atualizar"
						mt={4}
						onPress={handleSubmit(handleProfileUpdate)}
					/>
				</Center>
			</ScrollView>
		</VStack>
	);
}

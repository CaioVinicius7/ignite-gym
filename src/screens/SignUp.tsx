import { VStack, Image, Text, Center, Heading, ScrollView } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Input } from "@components/Input";
import { Button } from "@components/Button";

import LogoSvg from "@assets/logo.svg";
import BackgroundImg from "@assets/background.png";

type FormDataProps = {
	name: string;
	email: string;
	password: string;
	passwordConfirm: string;
};

const signUpSchema = yup.object({
	name: yup.string().required("Informe o nome"),
	email: yup.string().required("Informe o e-mail").email("E-mail inválido")
});

export function SignUp() {
	const {
		control,
		handleSubmit,
		formState: { errors }
	} = useForm<FormDataProps>({
		resolver: yupResolver(signUpSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
			passwordConfirm: ""
		}
	});

	const navigation = useNavigation();

	function handleGoBack() {
		navigation.goBack();
	}

	function handleSignUp({
		name,
		email,
		password,
		passwordConfirm
	}: FormDataProps) {
		console.log({ name, email, password, passwordConfirm });
	}

	return (
		<ScrollView
			contentContainerStyle={{
				flexGrow: 1
			}}
			showsVerticalScrollIndicator={false}
		>
			<VStack flex={1} px={10} pb={16}>
				<Image
					source={BackgroundImg}
					defaultSource={BackgroundImg}
					alt="Pessoas treinando"
					resizeMode="contain"
					position="absolute"
				/>

				<Center my={24}>
					<LogoSvg />

					<Text color="gray.100" fontSize="sm">
						Treine sua mente e o seu corpo.
					</Text>
				</Center>

				<Center>
					<Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
						Crie sua conta
					</Heading>

					<Controller
						control={control}
						name="name"
						render={({ field: { value, onChange } }) => (
							<Input
								placeholder="Nome"
								onChangeText={onChange}
								value={value}
								errorMessage={errors.name?.message}
							/>
						)}
					/>

					<Controller
						control={control}
						name="email"
						render={({ field: { value, onChange } }) => (
							<Input
								placeholder="E-mail"
								keyboardType="email-address"
								autoCapitalize="none"
								onChangeText={onChange}
								value={value}
								errorMessage={errors.email?.message}
							/>
						)}
					/>

					<Controller
						control={control}
						name="password"
						render={({ field: { value, onChange } }) => (
							<Input
								placeholder="Senha"
								secureTextEntry
								onChangeText={onChange}
								value={value}
							/>
						)}
					/>

					<Controller
						control={control}
						name="passwordConfirm"
						render={({ field: { value, onChange } }) => (
							<Input
								placeholder="Confirmar a senha"
								secureTextEntry
								onChangeText={onChange}
								value={value}
								onSubmitEditing={handleSubmit(handleSignUp)}
								returnKeyType="send"
							/>
						)}
					/>

					<Button
						title="Criar e acessar"
						onPress={handleSubmit(handleSignUp)}
					/>
				</Center>

				<Button
					title="Voltar para o login"
					variant="outline"
					mt={24}
					onPress={handleGoBack}
				/>
			</VStack>
		</ScrollView>
	);
}

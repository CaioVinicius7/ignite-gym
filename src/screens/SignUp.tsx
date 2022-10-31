import { VStack, Image, Text, Center, Heading, ScrollView } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";

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

export function SignUp() {
	const {
		control,
		handleSubmit,
		formState: { errors }
	} = useForm<FormDataProps>({
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
						rules={{
							required: "Informe o nome"
						}}
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
						rules={{
							required: "Informe o e-mail",
							pattern: {
								value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
								message: "E-mail inválido"
							}
						}}
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
						rules={{
							required: "Informe a senha"
						}}
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
						rules={{
							required: "Informe a confirmação de senha"
						}}
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

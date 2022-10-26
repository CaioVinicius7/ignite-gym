import { Button as ButtonNativeBase, IButtonProps, Text } from "native-base";

interface ButtonProps extends IButtonProps {
	title: string;
}

export function Button({ title, ...props }: ButtonProps) {
	return (
		<ButtonNativeBase
			w="full"
			h={14}
			bg="green.700"
			rounded="sm"
			_pressed={{
				bg: "green.500"
			}}
			{...props}
		>
			<Text color="white" fontFamily="heading" fontSize="sm">
				{title}
			</Text>
		</ButtonNativeBase>
	);
}

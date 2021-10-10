import {
    AlertDescription,
	AlertIcon,
	AlertTitle,
	Button,
	CloseButton
} from '@chakra-ui/react'

const Alert = ({status, title, description, submitHandler, closeHandler}) => {
	return (
		<Alert status={status} px={5} py={5}>
			<AlertIcon />
			<AlertTitle>{title}</AlertTitle>
			<AlertDescription mr={3}>
				{description}
			</AlertDescription>
			<Button
				onClick={submitHandler}
				mr={3}
				variant="solid"
				size="sm"
				p={2}
				colorScheme="blue">
				Yes, please!
			</Button>
			<CloseButton onClick={closeHandler}></CloseButton>
		</Alert>
	)
}

export default Alert

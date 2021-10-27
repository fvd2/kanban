import {
	Alert,
	AlertDescription,
	AlertIcon,
	AlertTitle,
	Button,
	CloseButton
} from '@chakra-ui/react'

const AlertComponent = ({
	status,
	title,
	description,
	handleSubmit,
	handleClose
}) => {
	return (
		<Alert
			display="flex"
			justify="space-between"
			status={status}
			px={5}
			py={5}>
			<AlertIcon />
			<AlertTitle>{title}</AlertTitle>
			<AlertDescription mr={3}>{description}</AlertDescription>
			<Button
				onClick={handleSubmit}
				mr={3}
				variant="solid"
				size="sm"
				p={2}
				colorScheme="blue">
				Yes, please!
			</Button>
			<CloseButton onClick={handleClose} />
		</Alert>
	)
}

export default AlertComponent

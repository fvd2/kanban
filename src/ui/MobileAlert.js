import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogContent,
	AlertDialogCloseButton,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Button
} from '@chakra-ui/react'

const MobileAlert = ({ isOpen, onClose }) => {
	return (
		<>
			<AlertDialog
				motionPreset="slideInBottom"
				onClose={onClose}
				isOpen={isOpen}
				isCentered>
				<AlertDialogOverlay />

				<AlertDialogContent>
					<AlertDialogHeader>
						Mobile device detected
					</AlertDialogHeader>
					<AlertDialogCloseButton />
					<AlertDialogBody>
						This application was designed for larger devices (e.g.
						tablet, laptop or pc). Proceed at your own (UX) peril.
					</AlertDialogBody>
					<AlertDialogFooter>
						<Button onClick={onClose} colorScheme="teal" ml={3}>
							OK
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	)
}

export default MobileAlert

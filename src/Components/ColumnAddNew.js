import {
	Button,
	Modal,
	ModalBody,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	Input,
	FormControl,
	FormErrorMessage
} from '@chakra-ui/react'
import { Formik, Form, Field } from 'formik'

const ColumnAddNew = ({ isOpen, onClose, onAdd }) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Add a column</ModalHeader>
				<Formik
					initialValues={{ columnName: '' }}
					validate={values => {
						const errors = {}
						if (!values.columnName) {
							errors.columnName = 'Required'
						}
						return errors
					}}
					onSubmit={(values, { setSubmitting }) => {
						setTimeout(() => {
							onAdd(values.columnName)
							setSubmitting(false)
							onClose()
						}, 100)
					}}>
					{({ errors, touched, isSubmitting }) => (
						<Form>
							<ModalBody>
								<Field name="columnName">
									{({ field }) => (
										<FormControl isInvalid={errors.columnName && touched.columnName}>
										<Input
											{...field}
											name="columnName"
											placeholder="Column name"
										/>
										<FormErrorMessage>{errors.columnName}</FormErrorMessage>
										</FormControl>
									)}
								</Field>
							</ModalBody>
							<ModalFooter>
								<Button
									colorScheme="blue"
									type="submit"
									mr={3}
									isDisabled={errors.columnName}
									isLoading={isSubmitting}>
									Add
								</Button>
								<Button variant="ghost" onClick={onClose}>
									Cancel
								</Button>
							</ModalFooter>
						</Form>
					)}
				</Formik>
			</ModalContent>
		</Modal>
	)
}

export default ColumnAddNew

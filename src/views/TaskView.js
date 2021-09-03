import { useState, useRef } from 'react'
import {
	Button,
	Circle,
	Drawer,
	DrawerBody,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	Flex,
	FormControl,
	FormErrorMessage,
	Input,
	Select,
	Text
} from '@chakra-ui/react'
import { Formik, Form, Field } from 'formik'
import { colors } from '../theme'

const TaskView = ({
	btnRef,
	isOpen,
	onClose,
	heading,
	id,
	title,
	color,
	owner,
	taskHandler,
	columns = [],
	columnTitlesToIds
}) => {
	const [selectedColor, setSelectedColor] = useState(color)
	const [selectedColumn, setSelectedColumn] = useState()
	const availableColors = [1, 2, 3, 4, 5, 6]

	const columnRef = useRef()
	console.log(columnTitlesToIds)

	const handleColumnChange = () => {
		setSelectedColumn(columnRef.current.id)
	}

	const colorButtons = availableColors.map(colorId => {
		if (selectedColor === colors.tasks[colorId].trim()) {
			return (
				<Circle
					key={colorId}
					align="center"
					size="24px"
					border="2px solid black"
					m={0.5}
					bg={colors.tasks[colorId]}
				/>
			)
		} else
			return (
				<Circle
					key={colorId}
					align="center"
					cursor="pointer"
					size="24px"
					border="2px solid white"
					m={0.5}
					bg={colors.tasks[colorId]}
					onClick={() => setSelectedColor(colors.tasks[colorId])}
				/>
			)
	})

	return (
		<Drawer
			isOpen={isOpen}
			onClose={onClose}
			placement="right"
			finalFocusRef={btnRef}>
			<DrawerOverlay />
			<DrawerContent>
				<DrawerCloseButton />
				<DrawerHeader>{heading}</DrawerHeader>
				<Formik
					initialValues={{
						title,
						owner,
						column: { ...(columns.length > 0 ? columns[0] : '') }
					}}
					validate={values => {
						const errors = {}
						if (!values.title) {
							errors.title = 'Required'
						}
						return errors
					}}
					onSubmit={(values, { setSubmitting }) => {
						setTimeout(() => {
							taskHandler({
								taskId: id,
								title: values.title,
								owner: values.owner,
								color: selectedColor,
								columnId: columnTitlesToIds.get(selectedColumn)
							})
							setSubmitting(false)
							onClose()
						}, 100)
					}}>
					{({ errors, touched, isSubmitting }) => (
						<Form>
							<DrawerBody>
								<Field name="title">
									{({ field }) => (
										<FormControl
											mb={3}
											isInvalid={
												errors.title && touched.title
											}>
											<Text>Title:</Text>
											<Input
												{...field}
												name="title"
												placeholder="Task title"
											/>
											<FormErrorMessage>
												{errors.title}
											</FormErrorMessage>
										</FormControl>
									)}
								</Field>
								<Field name="owner">
									{({ field }) => (
										<FormControl
											mb={3}
											isInvalid={
												errors.owner && touched.owner
											}>
											<Text>Owner:</Text>
											<Input
												{...field}
												name="owner"
												placeholder="Task owner"
											/>
											<FormErrorMessage>
												{errors.owner}
											</FormErrorMessage>
										</FormControl>
									)}
								</Field>
								{id === '' && (
									<Field name="category">
										{({ field }) => (
											<FormControl
												mb={3}
												isInvalid={
													errors.title &&
													touched.title
												}>
												<Text>Title:</Text>
												<Select
													ref={columnRef}
													onChange={
														handleColumnChange
													}>
													{Object.values(columns).map(
														column => (
															<option
																key={column.id}
																id={column.id}
																value={
																	column.title
																}>
																{column.title}
															</option>
														)
													)}
												</Select>

												<FormErrorMessage>
													{errors.title}
												</FormErrorMessage>
											</FormControl>
										)}
									</Field>
								)}
								<Text>Color:</Text>
								<Flex>{colorButtons}</Flex>
							</DrawerBody>
							<DrawerFooter>
								<Button variant="ghost" onClick={onClose}>
									Cancel
								</Button>
								<Button
									colorScheme="blue"
									type="submit"
									mr={3}
									isDisabled={errors.columnName}
									isLoading={isSubmitting}>
									Submit
								</Button>
							</DrawerFooter>
						</Form>
					)}
				</Formik>
			</DrawerContent>
		</Drawer>
	)
}

export default TaskView

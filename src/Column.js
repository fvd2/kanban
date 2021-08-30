import { useState } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import {
	Container,
	Center,
	Heading,
	Input,
	FormControl
} from '@chakra-ui/react'
import { Formik, Form, Field } from 'formik'
import TaskList from './TaskList'

const Column = ({ id, title, tasks, index, onTitleSubmit, onColorChange }) => {
	const [editTitle, setEditTitle] = useState(false)

	const handleTitleSelect = () => {
		setEditTitle(prevState => !prevState)
	}

	const editColumnField = (
		<Formik
			initialValues={{ columnName: title }}
			validate={values => {
				const errors = {}
				if (!values.columnName) {
					errors.columnName = 'Required'
				}
				return errors
			}}
			onSubmit={values => {
				onTitleSubmit({ id, title: values.columnName })
				handleTitleSelect()
			}}>
			{({ handleSubmit, errors }) => (
				<Form>
					<Field name="columnName">
						{({ field }) => (
							<FormControl isInvalid={errors.columnName}>
								<Input
									{...field}
									name="columnName"
									placeholder="Column name"
									onBlur={handleSubmit}
								/>
							</FormControl>
						)}
					</Field>
				</Form>
			)}
		</Formik>
	)

	return (
		<Draggable draggableId={id} index={index}>
			{provided => (
				<Container
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					mr="1em"
					borderRadius="5px"
					bg="#F0EFEB">
					<Center>
						{editTitle ? (
							editColumnField
						) : (
							<Heading
								onClick={handleTitleSelect}
								m={2}
								size={'lg'}>
								{title}
							</Heading>
						)}
					</Center>
					<Droppable droppableId={id} type="task" index={index}>
						{provided => (
							<div ref={provided.innerRef}>
								<TaskList
									{...provided.droppableProps}
									tasks={tasks}
									onColorChange={onColorChange}></TaskList>
								{provided.placeholder}
							</div>
						)}
					</Droppable>
					{provided.placeholder}
				</Container>
			)}
		</Draggable>
	)
}

export default Column

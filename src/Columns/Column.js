import { useState, useRef, useEffect } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import {
	Box,
	Container,
	Flex,
	FormControl,
	Heading,
	IconButton,
	Input,
	Text
} from '@chakra-ui/react'
import { Formik, Form, Field } from 'formik'
import AddTask from "../Tasks/AddTask"
import TaskList from '../Tasks/TaskList'
import { EditIcon } from '@chakra-ui/icons'

const Column = ({
	width,
	id,
	title,
	tasks,
	index,
	onColumnSubmit,
	onTaskSubmit,
	onColorChange
}) => {
	const [isEditingTitle, setEditingTitle] = useState(false)
	const inputRef = useRef()
	useEffect(() => {
		if(isEditingTitle) {
			inputRef.current.focus()
		}
	},[isEditingTitle])

	const handleTitleSelect = () => {
		setEditingTitle(prevState => !prevState)
	}

	const [isOpen, setIsOpen] = useState(false)

    const toggleAddTask = () => {
        setIsOpen(prevState => !prevState)
    }

	const editTitleField = (
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
				onColumnSubmit({ id, title: values.columnName })
				handleTitleSelect()
			}}>
			{({ handleSubmit, errors }) => (
				<Form>
					<Field name="columnName">
						{({ field }) => (
							<FormControl isInvalid={errors.columnName}>
								<Input
									{...field}
									ref={inputRef}
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
		<Box>
			<Draggable draggableId={id} index={index}>
				{provided => (
					<Container
						width={width}
						ref={provided.innerRef}
						{...provided.draggableProps}
						{...provided.dragHandleProps}
						p={5}>
						<Box
							align="center"
							bg="#FFFFFF"
							mb={3}
							p={0}
							border="1px solid #CACFD6"
							borderRadius={2}>
							{isEditingTitle ? (
								editTitleField
							) : (
								<Flex align="center" justify="space-between">
									<Heading
										ml={3} mt={1}
										mb={1}
										align="center"
										lineHeight="unset"
										size="sm">
										{title}
									</Heading>
									<IconButton onClick={handleTitleSelect} size="sm" variant="unstyled" icon={<EditIcon />} />
								</Flex>
							)}
						</Box>
						<Box mb={3} borderBottom="2px solid #CACFD6" />
						<Droppable droppableId={id} type="task" index={index}>
							{provided => (
								<div ref={provided.innerRef}>
									<TaskList
										{...provided.droppableProps}
										tasks={tasks}
										onColorChange={onColorChange}
										onTaskSubmit={onTaskSubmit}
										columnId={id}></TaskList>
									{provided.placeholder}
								</div>
							)}
						</Droppable>
						{provided.placeholder}
						{!isOpen ? <Text justify="center" color="#666666" onClick={toggleAddTask}>+ Add Task</Text> : <AddTask onSubmit={onTaskSubmit} hideTaskInput={toggleAddTask} isOpen={isOpen} columnId={id}/>}
					</Container>
				)}
			</Draggable>
		</Box>
	)
}

export default Column

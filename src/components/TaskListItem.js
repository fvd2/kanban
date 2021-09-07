import { useState, useRef, useEffect } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { Formik, Form, Field } from 'formik'
import {
	Box,
	FormControl,
	Flex,
	IconButton,
	Input,
	Text
} from '@chakra-ui/react'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'

const TaskListItem = ({
	listName,
	index,
	activeList,
	onListSwitch,
	onListSubmit,
	onDelete
}) => {
	const [optionsAreOpen, setOptionsAreOpen] = useState(false)
	const [isEditing, setIsEditing] = useState(false)
	const inputRef = useRef()

	useEffect(() => {
		if (isEditing) {
			inputRef.current.focus()
		}
	}, [isEditing])

	const toggleOptions = event => {
		if (event.type === 'mouseover' || event.type === 'mouseenter') {
			setOptionsAreOpen(true)
		}
		if (event.type === 'mouseleave') {
			setOptionsAreOpen(false)
		}
	}

	const handleDelete = () => {
		onDelete({ type: 'deleteList', payload: listName })
	}

	const handleEdit = () => {
		setIsEditing(true)
	}

	const editListField = (
		<Formik
			initialValues={{ listName }}
			validate={values => {
				const errors = {}
				if (!values.listName) {
					errors.listName = 'Required'
				}
				return errors
			}}
			onSubmit={values => {
				onListSubmit({
					type: 'renameList',
					payload: { listName, newName: values.listName }
				})
			}}>
			{({ handleSubmit, errors }) => (
				<Form>
					<Field name="listName">
						{({ field }) => (
							<FormControl isInvalid={errors.listName}>
								<Input
									{...field}
									ref={inputRef}
									name="listName"
									placeholder="List name"
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
		<Draggable draggableId={listName} index={index}>
			{provided => (
				<Flex
					height="50px"
					width="100%"
					{...provided.draggableProps}
						ref={provided.innerRef}
						{...provided.dragHandleProps}
					onMouseEnter={toggleOptions}
					onMouseOver={toggleOptions}
					onMouseLeave={toggleOptions}>
					{isEditing ? (
						editListField
					) : (
						<Flex key={listName} align="center">
							<Text
								cursor="pointer"
								size="md"
								aria-label="Task list selector"
								{...(listName === activeList
									? { as: 'b' }
									: '')}
								color="white"
								onClick={onListSwitch}>
								{listName}
							</Text>
							{optionsAreOpen && (
								<Box>
									<IconButton
										bg="transparent"
										isRound={true}
										onClick={handleDelete}
										icon={<DeleteIcon />}
									/>
									<IconButton
										bg="transparent"
										isRound={true}
										onClick={handleEdit}
										icon={<EditIcon />}
									/>
								</Box>
							)}
						</Flex>
					)}
					{provided.placeholder}
				</Flex>
			)}
		</Draggable>
	)
}

export default TaskListItem

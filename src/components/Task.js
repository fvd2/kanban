import { useState, useRef } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import {
	Avatar,
	Circle,
	Container,
	Flex,
	IconButton,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Popover,
	PopoverContent,
	PopoverTrigger,
	Portal,
	Text,
	Tooltip,
	useDisclosure
} from '@chakra-ui/react'
import { colors } from '../theme'
import { SettingsIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'
import TaskView from '../views/TaskView'

const Task = ({
	id,
	index,
	title,
	color,
	owner,
	onColorChange,
	onDeleteTask,
	columnId,
	onSubmitEditedTask,
	columns,
	columnTitlesToIds
}) => {
	const [optionsAreOpen, setOptionsAreOpen] = useState(false)
	const { isOpen, onOpen, onClose } = useDisclosure()
	const btnRef = useRef()
	const handleColorChange = (colorId, onClosePopover) => {
		onColorChange(id, colors.tasks[colorId])
		onClosePopover()
	}

	const handleOptions = event => {
		if (event.type === 'mouseenter' || event.type === 'mouseover') {
			setOptionsAreOpen(true)
		}
		if (event.type === 'mouseleave') {
			setOptionsAreOpen(false)
		}
	}

	const handleEditTask = () => {
		onOpen()
	}

	const submitEditedTask = payload => {
		onSubmitEditedTask(payload)
	}

	const handleDeleteTask = () => {
		onDeleteTask(columnId, id, index)
	}

	const availableColors = [1, 2, 3, 4, 5, 6]
	const colorButtons = onClose =>
		availableColors.map(colorId => (
			<Circle
				key={colorId}
				align="center"
				size="16px"
				m={0.5}
				bg={colors.tasks[colorId]}
				onClick={() => handleColorChange(colorId, onClose)}
			/>
		))

	return (
		<>
			<Draggable draggableId={id} index={index}>
				{provided => (
					<>
						<Container
							justify="center"
							onMouseEnter={handleOptions}
							onMouseOver={handleOptions}
							bg="white"
							mb={1}
							pl={2}
							pt={1}
							pb={1}
							pr={0.5}
							border="1px solid #CACFD6"
							borderRadius={2}
							boxShadow={'2x1'}
							height="auto"
							{...provided.draggableProps}
							ref={provided.innerRef}
							{...provided.dragHandleProps}>
							<Flex align="center">
								<Popover>
									{({ onClosePopover }) => (
										<>
											<PopoverTrigger>
												<Circle
													align="center"
													size="16px"
													bg={color}
													mr={1}
												/>
											</PopoverTrigger>
											<Portal>
												<PopoverContent
													width="auto"
													p={1}>
													<Flex>
														{colorButtons(onClosePopover)}
													</Flex>
												</PopoverContent>
											</Portal>
										</>
									)}
								</Popover>
								{/* TODO: only show tooltip if text is truncated */}
								<Flex
									justify="space-between"
									align="center"
									width="90%">
									<Tooltip label={title}>
										<Text
											fontSize="sm"
											textAlign="center"
											as="b"
											isTruncated>
											{title}
										</Text>
									</Tooltip>
									<TaskView
										btnRef={btnRef}
										isOpen={isOpen}
										onClose={onClose}
										heading="Edit task"
										id={id}
										title={title}
										color={color}
										owner={owner}
										taskHandler={submitEditedTask}
										columns={columns}
										columnTitlesToIds={columnTitlesToIds}
										columnId={columnId}
										index={index}
									/>

									{optionsAreOpen ? (
										<>
											<Menu>
												<MenuButton
													as={IconButton}
													aria-label="display task settings"
													variant="unstyled"
													size="xs"
													icon={<SettingsIcon />}
												/>
												<MenuList>
													<MenuItem
														icon={<EditIcon />}
														command="E"
														onClick={handleEditTask}
														ref={btnRef}>
														Edit
													</MenuItem>
													<MenuItem
														icon={<DeleteIcon />}
														command="D"
														onClick={
															handleDeleteTask
														}>
														Delete
													</MenuItem>
												</MenuList>
											</Menu>
										</>
									) : (
										<IconButton
											variant="unstyled"
											size="xs"
										/>
									)}
								</Flex>
							</Flex>
							{owner && (
								<Flex align="center">
									<Avatar size="2xs" mr={1}></Avatar>
									<Text fontSize="sm">{owner}</Text>
								</Flex>
							)}
						</Container>
					</>
				)}
			</Draggable>
		</>
	)
}

export default Task

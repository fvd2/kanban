import { useState, useEffect } from 'react'
import { Box, Flex, IconButton, Icon, useDisclosure } from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import { BsKanban, BsTable } from 'react-icons/bs'
import { DragDropContext } from 'react-beautiful-dnd'
import ColumnAddNew from '../components/ColumnAddNew'
import BoardView from '../views/BoardView'
import TableView from '../views/TableView'

const Body = ({
	taskListData,
	userId,
	activeList,
	dispatch,
	toggleMenu,
	isSmallerThan768,
	view, 
	toggleView
}) => {
	const [data, setData] = useState(taskListData)
	const { isOpen, onOpen, onClose } = useDisclosure()

	const [columnTitlesToIds, setColumnTitlesToIds] = useState(new Map())

	useEffect(() => {
		setData(taskListData)
		setColumnTitlesToIds(
			createTwoWayMap(taskListData, taskListData.activeList)
		)
	}, [taskListData])

	function createTwoWayMap(taskListData, activeList) {
		if (
			taskListData.taskLists[activeList] &&
			taskListData.taskLists[activeList].columns
		)
			return new Map(
				Object.values(taskListData.taskLists[activeList].columns)
					.map(column => [column.title, column.id])
					.concat(
						Object.values(
							taskListData.taskLists[activeList].columns
						).map(column => [column.id, column.title])
					)
			)
		else return new Map()
	}

	const handleOnDragEnd = result => {
		if (result.type === 'column' && result.destination) {
			dispatch({
				type: 'moveColumn',
				payload: {
					userId,
					sourceIndex: result.source.index,
					destinationIndex: result.destination.index,
					draggableId: result.draggableId
				}
			})
		}
		if (result.type === 'task') {
			if (!result.destination) return
			dispatch({
				type: 'moveTask',
				payload: {
					userId,
					sourceColumn: result.source.droppableId,
					sourceIndex: result.source.index,
					destinationColumn: result.destination.droppableId,
					destinationIndex: result.destination.index,
					draggableId: result.draggableId
				}
			})
		}
	}

	const handleNewTask = (taskTitle, columnId) => {
		dispatch({
			type: 'addTask',
			payload: {
				userId,
				activeList,
				taskTitle,
				columnId
			}
		})
	}

	const handleDeleteTask = (columnId, taskId, index) => {
		dispatch({
			type: 'deleteTask',
			payload: { userId, columnId, taskId, index }
		})
	}

	const handleColumnTitleChange = (columnId, columnName) => {
		dispatch({
			type: 'renameColumn',
			payload: { userId, columnId, columnName }
		})
	}

	const handleDeleteColumn = (columnId, index) => {
		dispatch({
			type: 'deleteColumn',
			payload: { userId, columnId, index }
		})
	}

	const handleColorChange = (taskId, color) => {
		// activeList added here, not prop drilled to Task component
		dispatch({
			type: 'changeTaskColor',
			payload: { userId, activeList, taskId, color }
		})
	}

	const handleSubmitEditedTask = ({
		taskId,
		title,
		color,
		owner,
		columnId,
		sourceColumn,
		destinationColumn,
		index
	}) => {
		dispatch({
			type: 'editTask',
			payload: {
				userId,
				columnId,
				taskId,
				title,
				color,
				owner,
				sourceColumn,
				destinationColumn,
				index
			}
		})
	}

	const handleNewDetailedTask = ({ title, color, owner, columnId }) => {
		dispatch({
			type: 'addDetailedTask',
			payload: { userId, columnId, title, color, owner }
		})
	}

	return (
		<Box bg="#F4F4F4" minWidth="fit-content" height="100vh" width="100%">
			<DragDropContext onDragEnd={handleOnDragEnd}>
				<ColumnAddNew
					isOpen={isOpen}
					onOpen={onOpen}
					onClose={onClose}
					activeList={taskListData.activeList}
					dispatch={dispatch}
					userId={userId}
				/>
				<Flex direction="column">
					<Flex mt={5} ml={5}>
						{isSmallerThan768 && (
							<IconButton
								onClick={toggleMenu}
								isRound={true}
								size="xs"
								bgColor={"#424874"}
								color="white"
								_hover={{ bgColor: '#292D48' }}
								icon={<HamburgerIcon />}
								mr={5}
							/>
						)}
						{taskListData.taskLists[activeList].columnOrder.length > 0 && (
							<>
								<IconButton
									isDisabled={view === 'board'}
									isRound={true}
									colorScheme="blackAlpha"
									onClick={toggleView}
									size="xs"
									mr={1}
									icon={<Icon as={BsKanban} />}
								/>
								<IconButton
									isDisabled={view === 'table'}
									isRound={true}
									colorScheme="blackAlpha"
									size="xs"
									onClick={toggleView}
									icon={<Icon as={BsTable} />}
								/>
							</>
						)}
					</Flex>
					<Flex>
						{view === 'board' ? (
							<BoardView
								data={data.taskLists[activeList]}
								onOpen={onOpen}
								dispatch={dispatch}
								onDrop={handleOnDragEnd}
								onColumnSubmit={handleColumnTitleChange}
								onAddTask={handleNewTask}
								onColorChange={handleColorChange}
								onDeleteColumn={handleDeleteColumn}
								onDeleteTask={handleDeleteTask}
								onSubmitEditedTask={handleSubmitEditedTask}
								columnTitlesToIds={columnTitlesToIds}
							/>
						) : (
							<TableView
								data={data.taskLists[activeList]}
								columnTitlesToIds={columnTitlesToIds}
								onAddNewDetailedTask={handleNewDetailedTask}
								onSubmitEditedTask={handleSubmitEditedTask}
								onDeleteTask={handleDeleteTask}
							/>
						)}
					</Flex>
				</Flex>
			</DragDropContext>
		</Box>
	)
}

export default Body

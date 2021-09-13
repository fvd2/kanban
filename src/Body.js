import { useState, useEffect } from 'react'
import { Box, Flex, IconButton, Icon, useDisclosure } from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import { BsKanban, BsTable } from 'react-icons/bs'
import { DragDropContext } from 'react-beautiful-dnd'
import ColumnAddNew from './components/ColumnAddNew'
import BoardView from './views/BoardView'
import TableView from './views/TableView'

const Body = ({
	taskListData,
	activeList,
	dispatch,
	toggleMenu,
	isSmallerThan768
}) => {
	const [data, setData] = useState(taskListData)
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [view, setView] = useState('board')

	useEffect(() => {
		setData(taskListData)
		const createTwoWayMap = (taskListData, activeList) => {
			return new Map(
				Object.values(taskListData.taskLists[activeList].columns)
					.map(column => [column.title, column.id])
					.concat(
						Object.values(
							taskListData.taskLists[activeList].columns
						).map(column => [column.id, column.title])
					)
			)
		}
		setColumnTitlesToIds(createTwoWayMap(taskListData, taskListData.activeList))
	}, [taskListData])


	// creates two-way map between column titles (e.g. 'backlog') and ids
	const [columnTitlesToIds, setColumnTitlesToIds] = useState(
		new Map(
			Object.values(taskListData.taskLists[activeList].columns)
				.map(column => [column.title, column.id])
				.concat(
					Object.values(
						taskListData.taskLists[activeList].columns
					).map(column => [column.id, column.title])
				)
		)
	)

	const handleOnDragEnd = result => {
		if (result.type === 'column') {
			dispatch({
				type: 'moveColumn',
				payload: {
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
				activeList,
				taskTitle,
				columnId
			}
		})
	}

	const handleDeleteTask = (columnId, taskId, index) => {
		dispatch({ type: 'deleteTask', payload: { columnId, taskId, index } })
	}

	const handleColumnTitleChange = (columnId, columnName) => {
		dispatch({ type: 'renameColumn', payload: { columnId, columnName } })
	}

	const handleDeleteColumn = typeAndPayload => {
		dispatch(typeAndPayload)
	}

	const toggleView = () => {
		setView(prevState => (prevState === 'board' ? 'table' : 'board'))
	}

	const handleColorChange = (taskId, color) => {
		// activeList added here, not prop drilled to Task component
		dispatch({
			type: 'changeTaskColor',
			payload: { activeList, taskId, color }
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
			payload: { columnId, title, color, owner }
		})
	}
	
	return (
		<Box bg="#F4F4F4" minWidth="fit-content" width="100%">
			<DragDropContext onDragEnd={handleOnDragEnd}>
				<ColumnAddNew
					isOpen={isOpen}
					onOpen={onOpen}
					onClose={onClose}
					activeList={taskListData.activeList}
					dispatch={dispatch}
				/>
				<Flex direction="column">
					<Flex mt={5} ml={5}>
						{isSmallerThan768 && (
							<IconButton
								onClick={toggleMenu}
								isRound={true}
								size="xs"
								bgColor="#424874"
								color="white"
								_hover={{ bgColor: '#292D48' }}
								icon={<HamburgerIcon />}
								mr={5}
							/>
						)}
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

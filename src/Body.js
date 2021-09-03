import { useState, useEffect } from 'react'
import { Box, Flex, IconButton, Icon, useDisclosure } from '@chakra-ui/react'
import { BsKanban, BsTable } from 'react-icons/bs'
import { DragDropContext } from 'react-beautiful-dnd'
import ColumnAddNew from './components/ColumnAddNew'
import BoardView from './views/BoardView'
import TableView from './views/TableView'

const Body = ({ taskListData, activeList, dispatch }) => {
	const [data, setData] = useState(taskListData)
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [view, setView] = useState('board')

	useEffect(() => {
		setData(taskListData)
	}, [taskListData])

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
				taskTitle,
				activeList,
				columnId
			}
		})
	}

	const handleColumnTitleChange = (columnId, columnName) => {
		dispatch({ type: 'renameColumn', payload: { columnId, columnName } })
	}

	const handleDeleteColumn = (typeAndPayload) => {
		dispatch(typeAndPayload)
	}

	const handleViewToggle = () => {
		setView(prevState => (prevState === 'board' ? 'table' : 'board'))
	}

	const handleColorChange = (taskId, color) => {
		setData(prevState => ({
			...prevState,
			...(prevState.tasks[taskId].color = color)
		}))
	}

	return (
		<Box m={0} p={0} bg="#F4F4F4">
			<DragDropContext onDragEnd={handleOnDragEnd}>
				<ColumnAddNew
					isOpen={isOpen}
					onOpen={onOpen}
					onClose={onClose}
					activeList={taskListData.activeList}
					dispatch={dispatch}
				/>
				<Flex direction="column">
					<Flex mb={5}>
						<IconButton
							isDisabled={view === 'board'}
							onClick={handleViewToggle}
							icon={<Icon as={BsKanban} />}
						/>
						<IconButton
							isDisabled={view === 'table'}
							onClick={handleViewToggle}
							icon={<Icon as={BsTable} />}
						/>
					</Flex>
					<Flex mt={5}>
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
							/>
						) : (
							<TableView data={data[activeList]} />
						)}
					</Flex>
				</Flex>
			</DragDropContext>
		</Box>
	)
}

export default Body

import { useState, useEffect } from 'react'
import { Box, Flex, IconButton, Icon, useDisclosure } from '@chakra-ui/react'
import { BsKanban, BsTable } from 'react-icons/bs'
import { DragDropContext } from 'react-beautiful-dnd'
import ColumnAddNew from './components/ColumnAddNew'
import BoardView from './views/BoardView'
import TableView from './views/TableView'
import { v4 as uuidv4 } from 'uuid'
import DUMMY_DATA from './data'

const Body = ({ activeList, taskLists }) => {
	const [data, setData] = useState(DUMMY_DATA)
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [view, setView] = useState('board')

	useEffect(() => {
		const newListName = taskLists[taskLists.length - 1]
		const newListObj = {
			name: newListName,
			tasks: {},
			columns: {
				id: 'column-1',
				title: 'column-1',
				taskIds: []
			},
			columnOrder: ['column-1']
		}
		console.log(newListName)
		setData(prevState => ({
			...prevState,
			...(prevState[newListName] = newListObj)
		}))
	}, [taskLists])

	console.log(data)

	const handleOnDragEnd = result => {
		if (result.type === 'column') {
			setData(prevState => ({
				...prevState,
				...prevState[activeList].columnOrder.splice(
					result.source.index,
					1
				),
				...prevState[activeList].columnOrder.splice(
					result.destination.index,
					0,
					result.draggableId
				)
			}))
		}
		if (result.type === 'task') {
			if (!result.destination) return
			const sourceCol = result.source.droppableId
			const destCol = result.destination.droppableId
			setData(prevState => {
				return {
					...prevState,
					...prevState[activeList].columns[sourceCol].taskIds.splice(
						result.source.index,
						1
					),
					...prevState[activeList].columns[destCol].taskIds.splice(
						result.destination.index,
						0,
						result.draggableId
					)
				}
			})
		}
	}

	const handleNewColumn = newColumnTitle => {
		const newColumn = {
			id: uuidv4(),
			title: newColumnTitle,
			taskIds: []
		}
		setData(prevState => ({
			...prevState,
			...(prevState[activeList].columns[newColumn.id] = newColumn),
			...prevState[activeList].columnOrder.push(newColumn.id)
		}))
	}

	const handleNewTask = (taskTitle, columnId) => {
		const newTask = {
			id: uuidv4(),
			title: taskTitle,
			color: '#EAEAEA'
		}
		setData(prevState => ({
			...prevState,
			...(prevState[activeList].tasks[newTask.id] = newTask),
			...prevState[activeList].columns[columnId].taskIds.push(newTask.id)
		}))
	}

	const handleColumnTitleChange = colData => {
		setData(prevState => ({
			...prevState,
			...(prevState[activeList].columns[colData.id].title = colData.title)
		}))
	}

	const handleViewToggle = () => {
		setView(prevState => (prevState === 'board' ? 'table' : 'board'))
	}

	const handleColorChange = (taskId, color) => {
		setData(prevState => ({
			...prevState,
			...(prevState[activeList].tasks[taskId].color = color)
		}))
	}

	return (
		<Box m={0} p={0} bg="#F4F4F4">
			<DragDropContext onDragEnd={handleOnDragEnd}>
				<ColumnAddNew
					isOpen={isOpen}
					onOpen={onOpen}
					onClose={onClose}
					onAdd={handleNewColumn}
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
								data={data[activeList]}
								onOpen={onOpen}
								onTaskSubmit={handleNewTask}
								onDrop={handleOnDragEnd}
								onColumnSubmit={handleColumnTitleChange}
								onColorChange={handleColorChange}
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

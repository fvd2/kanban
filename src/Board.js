import { useState } from 'react'
import Column from './Column'
import {
	Container as Box,
	Flex,
	useDisclosure,
	IconButton,
	Icon
} from '@chakra-ui/react'
import { BsKanban, BsTable } from 'react-icons/bs'
import { AddIcon } from '@chakra-ui/icons'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import NewColumnModal from './NewColumnModal'
import AddTask from './AddTask'
import TableView from './TableView'
import { v4 as uuidv4 } from 'uuid'
import DUMMY_DATA from './data'



const Board = () => {
	const [data, setData] = useState(DUMMY_DATA)
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [view, setView] = useState('board')

	const handleOnDragEnd = result => {
		if (result.type === 'column') {
			setData(prevState => ({
				...prevState,
				...prevState.columnOrder.splice(result.source.index, 1),
				...prevState.columnOrder.splice(
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
					...prevState.columns[sourceCol].taskIds.splice(
						result.source.index,
						1
					),
					...prevState.columns[destCol].taskIds.splice(
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
			...(prevState.columns[newColumn.id] = newColumn),
			...prevState.columnOrder.push(newColumn.id)
		}))
	}

	const handleNewTask = taskTitle => {
		const newTask = {
			id: uuidv4(),
			title: taskTitle
		}
		setData(prevState => ({
			...prevState,
			...(prevState.tasks[newTask.id] = newTask),
			...prevState.columns[
				Object.keys(prevState.columns)[0]
			].taskIds.push(newTask.id)
		}))
	}

	const handleColumnTitleChange = colData => {
		setData(prevState => ({
			...prevState,
			...(prevState.columns[colData.id].title = colData.title)
		}))
	}

	const handleViewToggle = () => {
		setView(prevState => (prevState === 'board' ? 'table' : 'board'))
	}

	const handleColorChange = (taskId, color) => {
		setData(prevState => ({
			...prevState,
			...prevState.tasks[taskId].color = color
		}))
	}

	const board = (
		<Droppable droppableId="board" type="column" direction="horizontal">
			{provided => (
				<>
					<Box
						display="flex"
						ref={provided.innerRef}
						{...provided.droppableProps}>
						{DUMMY_DATA.columnOrder.map((columnId, index) => (
							<Column
								key={columnId}
								id={columnId}
								index={index}
								title={data.columns[columnId].title}
								taskIds={data.columns[columnId].taskIds}
								tasks={data.columns[columnId].taskIds.map(
									taskId => data.tasks[taskId]
								)}
								onDrop={handleOnDragEnd}
								onTitleSubmit={handleColumnTitleChange}
								onColorChange={handleColorChange}
							/>
						))}
						<IconButton
							isRound={true}
							aria-label="Add column"
							icon={<AddIcon />}
							onClick={onOpen}
						/>
					</Box>
					{provided.placeholder}
				</>
			)}
		</Droppable>
	)

	return (
		<DragDropContext onDragEnd={handleOnDragEnd}>
			<NewColumnModal
				isOpen={isOpen}
				onOpen={onOpen}
				onClose={onClose}
				onAdd={handleNewColumn}
			/>
			<Flex direction="column" m={5}>
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
				<AddTask onSubmit={handleNewTask} />
				<Flex mt={5}>
					{view === 'board' ? board : <TableView data={data} />}
				</Flex>
			</Flex>
		</DragDropContext>
	)
}

export default Board

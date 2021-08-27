import { useState } from 'react'
import Column from './Column'
import { Container, IconButton, useDisclosure } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { DragDropContext } from 'react-beautiful-dnd'
import NewColumnModal from './NewColumnModal'
import { v4 as uuidv4 } from 'uuid';

const DUMMY_DATA = {
	tasks: {
		'task-1': { id: 'task-1', content: 'Buy supplies' },
		'task-2': { id: 'task-2', content: 'Prepare meals' },
		'task-3': { id: 'task-3', content: 'Pass the food to delivery person' }
	},
	columns: {
		'column-1': {
			id: 'column-1',
			title: 'Backlog',
			taskIds: ['task-1', 'task-2', 'task-3']
		},
		'column-2': {
			id: 'column-2',
			title: 'Doing',
			taskIds: []
		},
		'column-3': {
			id: 'column-3',
			title: 'Done',
			taskIds: []
		}
	},
	columnOrder: ['column-1', 'column-2', 'column-3']
}

const Board = () => {
	const [data, setData] = useState(DUMMY_DATA)
	const { isOpen, onOpen, onClose } = useDisclosure()


	const handleOnDragEnd = result => {
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

	const handleNewColumn = (newColumnTitle) => {
		const newColumn = {
			id: uuidv4(),
			title: newColumnTitle,
			taskIds: []
		}
		setData(prevState => ({
			...prevState,
			...prevState.columns[newColumn.id] = newColumn, 
			...prevState.columnOrder.push(newColumn.id)
		}))
	}

	const columns = DUMMY_DATA.columnOrder.map((columnId, index) => (
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
		/>
	))

	return (
		<DragDropContext onDragEnd={handleOnDragEnd}>
			<NewColumnModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} onAdd={handleNewColumn}/>
			<Container display='flex' m={5}>
				{columns}
				<IconButton
					isRound={true}
					aria-label="Add column"
					icon={<AddIcon />}
					onClick={onOpen}
				/>
			</Container>
		</DragDropContext>
	)
}

export default Board

import Column from './Column'
import { Flex, IconButton } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'

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

const columns = DUMMY_DATA.columnOrder.map((columnId, index) => (
	<Column
		key={columnId}
		id={columnId}
        index={index}
		title={DUMMY_DATA.columns[columnId].title}
		taskIds={DUMMY_DATA.columns[columnId].taskIds}
		tasks={DUMMY_DATA.columns[columnId].taskIds.map(taskId => DUMMY_DATA.tasks[taskId])}
	/>
))

const Board = () => {
	return <Flex m={5}>
        {columns}
        <IconButton isRound={true} aria-label="Add column" icon={<AddIcon />} />
        </Flex>
}

export default Board

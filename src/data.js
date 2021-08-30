import { colors } from './theme'

const DUMMY_DATA = {
	tasks: {
		'task-1': { id: 'task-1', title: 'Buy supplies', owner: 'Freek', color:colors.tasks[1]},
		'task-2': { id: 'task-2', title: 'Prepare meals', owner: 'Freek', color:colors.tasks[3] },
		'task-3': {
			id: 'task-3',
			title: 'Pass the food to delivery person',
			owner: 'Freek',
			color: colors.tasks[5]
		}
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

export default DUMMY_DATA
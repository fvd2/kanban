import { colors } from './theme'

const data = {
	Programming: {
		name: 'Programming',
		tasks: {
			'task-1': {
				id: 'task-1',
				title: 'Buy supplies',
				owner: 'Freek',
				color: colors.tasks[1]
			},
			'task-2': {
				id: 'task-2',
				title: 'Prepare meals',
				owner: 'Freek',
				color: colors.tasks[3]
			},
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
	},
	Work: {
		name: 'Work',
		tasks: {
			'task-1': {
				id: 'task-1',
				title: 'Prepare board presentation',
				owner: 'Freek',
				color: colors.tasks[1]
			},
			'task-2': {
				id: 'task-2',
				title: 'Develop scenario analysis',
				owner: 'John',
				color: colors.tasks[3]
			},
			'task-3': {
				id: 'task-3',
				title: 'Review market trends and implications',
				owner: 'Freek',
				color: colors.tasks[5]
			}
		},
		columns: {
			'column-1': {
				id: 'column-1',
				title: 'Not started',
				taskIds: ['task-1', 'task-2', 'task-3']
			},
			'column-2': {
				id: 'column-2',
				title: 'In progress',
				taskIds: []
			},
			'column-3': {
				id: 'column-3',
				title: 'Awaiting response',
				taskIds: []
			},
			'column-4': {
				id: 'column-3',
				title: 'Approved',
				taskIds: []
			}
		},
		columnOrder: ['column-1', 'column-2', 'column-3', 'column-4']
	}
}

export default data

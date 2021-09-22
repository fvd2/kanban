import { colors } from './theme'

export const DUMMY_DATA = { 
	activeList: 'Programming',
	listOrder: ['Programming', 'Work'],
	taskLists: {
		Programming: {
			name: 'Programming',
			tasks: {
				'task-1': {
					id: 'task-1',
					title: 'Finish portfolio site',
					owner: 'Freek',
					color: colors.tasks[1]
				},
				'task-2': {
					id: 'task-2',
					title: 'Study data structures and algorithms',
					owner: 'Freek',
					color: colors.tasks[3]
				},
				'task-3': {
					id: 'task-3',
					title: 'Create RESTful API template',
					owner: 'Freek',
					color: colors.tasks[5]
				},
				'task-4': {
					id: 'task-4',
					title: 'Complete KANBAN app',
					owner: 'Freek',
					color: colors.tasks[5]
				},
				'task-5': {
					id: 'task-5',
					title: 'Refactor portfolio applications',
					owner: 'Freek',
					color: colors.tasks[5]
				},
			},
			columns: {
				'column-1': {
					id: 'column-1',
					title: 'Backlog',
					taskIds: ['task-5']
				},
				'column-2': {
					id: 'column-2',
					title: 'Doing',
					taskIds: ['task-2']
				},
				'column-3': {
					id: 'column-3',
					title: 'Done',
					taskIds: ['task-1', 'task-4', 'task-3']
				}
			},
			columnOrder: ['column-1', 'column-2', 'column-3']
		},
	}
}
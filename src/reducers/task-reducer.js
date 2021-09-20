import { v4 as uuidv4 } from 'uuid'
import update from 'immutability-helper'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../services/firebase'

const TaskReducer = (state, action) => {
	let userId = action.payload.userId
	const updateFirebase = async updatedState => {
		try {
			await setDoc(doc(db, userId, 'taskListData'), updatedState)
		} catch (err) {
			console.error(`Error updating document: ${err}`)
		}
	}
	let updatedState
	let stateCopy = { ...state }
	switch (action.type) {
		case 'loadData':
			return action.payload.userData
		// list-level actions
		case 'addList':
			const newListObj = {
				[action.payload.listName]: {
					name: action.payload.listName,
					tasks: {},
					columns: {},
					columnOrder: []
				}
			}

			updatedState = update(state, {
				taskLists: { $merge: newListObj },
				listOrder: { $push: [action.payload.listName] },
				activeList: { $set: action.payload.listName }
			})

			updateFirebase(updatedState)

			return updatedState

		case 'deleteList':
			const indexToDelete = state.listOrder.findIndex(
				taskList => taskList === action.payload.listName
			)
			if (state.activeList === action.payload.listName) {
				const newActiveList = state.listOrder.find(
					taskList => taskList !== action.payload.listName
				)
				updatedState = update(state, {
					activeList: { $set: newActiveList ? newActiveList : '' },
					taskLists: { $unset: [action.payload.listName] },
					listOrder: { $splice: [[indexToDelete, 1]] }
				})
				updateFirebase(updatedState)
				return updatedState
			} else {
				updatedState = update(state, {
					activeList: { $set: '' },
					taskLists: { $unset: [action.payload.listName] },
					listOrder: { $splice: [[indexToDelete, 1]] }
				})
				updateFirebase(updatedState)
				return updatedState
			}
		case 'renameList':
			// update taskListName (activeList, taskList property name, taskList.name value)
			const renameProp = (
				oldProp,
				newProp,
				{ [oldProp]: old, ...others }
			) => ({
				// source: https://medium.com/front-end-weekly/immutably-rename-object-keys-in-javascript-5f6353c7b6dd
				[newProp]: old,
				...others
			})
			const updatedTaskListNames = renameProp(
				[action.payload.listName],
				[action.payload.newName],
				state.taskLists
			)
			updatedTaskListNames[action.payload.newName].name =
				action.payload.newName

			const currentIndex = state.listOrder.findIndex(
				list => list === action.payload.listName
			)

			updatedState = update(state, {
				taskLists: { $set: updatedTaskListNames },
				listOrder: {
					$splice: [[currentIndex, 1, action.payload.newName]]
				},
				activeList: { $set: action.payload.newName }
			})
			updateFirebase(updatedState)
			return updatedState
		case 'selectList':
			if (state.activeList !== action.payload.selectedList) {
				updatedState = update(state, {
					activeList: { $set: action.payload.selectedList }
				})
				updateFirebase(updatedState)
				return updatedState
			} else {
				return state
			}
		case 'moveList':
			// not using immutability-helper splice due to expected flickering issue (see moveColumn)
			stateCopy.listOrder.splice(action.payload.sourceIndex, 1)
			stateCopy.listOrder.splice(
				action.payload.destinationIndex,
				0,
				action.payload.draggableId
			)
			updatedState = stateCopy
			updateFirebase(updatedState)
			return updatedState

		// column-level actions
		case 'addColumn':
			const newColumn = {
				id: uuidv4(),
				title: action.payload.columnName,
				taskIds: []
			}

			updatedState = update(state, {
				taskLists: {
					[action.payload.activeList]: {
						columns: {
							$merge: {
								[newColumn.id]: newColumn
							}
						},
						columnOrder: { $push: [newColumn.id] }
					}
				}
			})
			updateFirebase(updatedState)
			return updatedState
		case 'moveColumn':
			// not using immutability-helper splice due to flickering issue
			stateCopy.taskLists[state.activeList].columnOrder.splice(
				action.payload.sourceIndex,
				1
			)
			stateCopy.taskLists[state.activeList].columnOrder.splice(
				action.payload.destinationIndex,
				0,
				action.payload.draggableId
			)
			updatedState = stateCopy
			updateFirebase(updatedState)
			return updatedState

		case 'renameColumn':
			updatedState = update(state, {
				taskLists: {
					[state.activeList]: {
						columns: {
							[action.payload.columnId]: {
								title: { $set: action.payload.columnName }
							}
						}
					}
				}
			})
			updateFirebase(updatedState)
			return updatedState
		case 'deleteColumn':
			updatedState = update(state, {
				taskLists: {
					[state.activeList]: {
						columns: {
							$unset: [action.payload.columnId]
						},
						columnOrder: { $splice: [[action.payload.index, 1]] }
					}
				}
			})
			updateFirebase(updatedState)
			return updatedState

		// task-level actions
		case 'addTask':
			const newTask = {
				id: uuidv4(),
				title: action.payload.taskTitle,
				color: '#EAEAEA',
				owner: ''
			}

			updatedState = update(state, {
				taskLists: {
					[state.activeList]: {
						tasks: { $merge: { [newTask.id]: newTask } },
						columns: {
							[action.payload.columnId]: {
								taskIds: { $push: [newTask.id] }
							}
						}
					}
				}
			})
			updateFirebase(updatedState)
			return updatedState

		case 'addDetailedTask':
			const newDetailedTask = {
				id: uuidv4(),
				title: action.payload.title,
				color: action.payload.color,
				owner: action.payload.owner
			}

			updatedState = update(state, {
				taskLists: {
					[state.activeList]: {
						tasks: {
							$merge: { [newDetailedTask.id]: newDetailedTask }
						},
						columns: {
							[action.payload.columnId]: {
								taskIds: { $push: [newDetailedTask.id] }
							}
						}
					}
				}
			})
			updateFirebase(updatedState)
			return updatedState

		case 'moveTask':
			// not using immutability-helper splice due to expected flickering issue (see moveColumn)
			const {
				sourceColumn,
				sourceIndex,
				destinationColumn,
				destinationIndex,
				draggableId
			} = action.payload

			stateCopy.taskLists[stateCopy.activeList].columns[
				sourceColumn
			].taskIds.splice(sourceIndex, 1)
			stateCopy.taskLists[stateCopy.activeList].columns[
				destinationColumn
			].taskIds.splice(destinationIndex, 0, draggableId)

			updatedState = stateCopy
			updateFirebase(updatedState)
			return updatedState

		// TODO: fix lagging move of +Add Task on moving last task from column
		case 'editTask':
			const updatedTask = {
				id: action.payload.taskId,
				title: action.payload.title,
				color: action.payload.color,
				owner: action.payload.owner
			}
			if (
				action.payload.sourceColumn !== action.payload.destinationColumn
			) {
				updatedState = update(state, {
					taskLists: {
						[state.activeList]: {
							tasks: {
								[action.payload.taskId]: { $set: updatedTask }
							},
							columns: {
								[action.payload.sourceColumn]: {
									taskIds: {
										$splice: [[action.payload.index, 1]]
									}
								},
								[action.payload.destinationColumn]: {
									taskIds: { $push: [action.payload.taskId] }
								}
							}
						}
					}
				})
				updateFirebase(updatedState)
				return updatedState
			} else
				updatedState = update(state, {
					taskLists: {
						[state.activeList]: {
							tasks: {
								[action.payload.taskId]: { $set: updatedTask }
							}
						}
					}
				})
			updateFirebase(updatedState)
			return updatedState
		case 'deleteTask':
			updatedState = update(state, {
				taskLists: {
					[state.activeList]: {
						tasks: { $unset: [action.payload.taskId] },
						columns: {
							[action.payload.columnId]: {
								taskIds: {
									$splice: [[action.payload.index, 1]]
								}
							}
						}
					}
				}
			})
			updateFirebase(updatedState)
			return updatedState
		case 'changeTaskColor':
			updatedState = update(state, {
				taskLists: {
					[state.activeList]: {
						tasks: {
							[action.payload.taskId]: {
								color: { $set: action.payload.color }
							}
						}
					}
				}
			})
			updateFirebase(updatedState)
			return updatedState
		default:
			throw new Error()
	}
}

export default TaskReducer

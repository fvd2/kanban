import { useReducer } from 'react'
import Body from './Body'
import Footer from './layout/Footer'
import SideBar from './layout/SideBar'
import { Flex } from '@chakra-ui/react'
import initialState from './data'
import { v4 as uuidv4 } from 'uuid'
import update from 'immutability-helper'

const reducer = (state, action) => {
	let stateCopy = { ...state }
	switch (action.type) {
		// list-level actions
		case 'addList':
			const newListObj = {
				[action.payload]: {
					name: action.payload,
					tasks: {},
					columns: {},
					columnOrder: []
				}
			}

			return update(state, {
				taskLists: { $merge: newListObj },
				listOrder: { $push: [action.payload] }
			})
		case 'deleteList':
			const indexToDelete = state.listOrder.findIndex(
				taskList => taskList === action.payload
			)
			if (state.activeList === action.payload) {
				const newActiveList = state.listOrder.find(
					taskList => taskList !== action.payload
				)
				return update(state, {
					activeList: { $set: newActiveList },
					taskLists: { $unset: [action.payload] },
					listOrder: { $splice: [[indexToDelete, 1]] }
				})
			} else {
				return update(state, {
					taskLists: { $unset: [action.payload] },
					listOrder: { $splice: [[indexToDelete, 1]] }
				})
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

			return update(state, {
				taskLists: { $set: updatedTaskListNames },
				listOrder: {
					$splice: [[currentIndex, 1, action.payload.newName]]
				},
				activeList: { $set: action.payload.newName }
			})
		case 'selectList':
			return update(state, {
				activeList: { $set: action.payload.selectedList }
			})
		case 'moveList':
			// not using immutability-helper splice due to expected flickering issue (see moveColumn)
			stateCopy.listOrder.splice(action.payload.sourceIndex, 1)
			stateCopy.listOrder.splice(
				action.payload.destinationIndex,
				0,
				action.payload.draggableId
			)

			return stateCopy
		// column-level actions
		case 'addColumn':
			const newColumn = {
				id: uuidv4(),
				title: action.payload.columnName,
				taskIds: []
			}

			return update(state, {
				taskLists: {
					[action.payload.activeList]: {
						columns: {
							$merge: {
								[action.payload.columnName]: newColumn
							}
						},
						columnOrder: { $push: [action.payload.columnName] }
					}
				}
			})
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
			return stateCopy

		case 'renameColumn':
			return update(state, {
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
		case 'deleteColumn':
			return update(state, {
				taskLists: {
					[state.activeList]: {
						columns: {
							$unset: [action.payload.columnId]
						},
						columnOrder: { $splice: [[action.payload.index, 1]] }
					}
				}
			})

		// task-level actions
		case 'addTask':
			const newTask = {
				id: uuidv4(),
				title: action.payload.taskTitle,
				color: '#EAEAEA',
				owner: ''
			}

			return update(state, {
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
		case 'addDetailedTask':
			const newDetailedTask = {
				id: uuidv4(),
				title: action.payload.title,
				color: action.payload.color,
				owner: action.payload.owner,
				columnId: action.payload.columnId
			}

			return update(state, {
				taskLists: {
					[state.activeList]: {
						tasks: { $merge: { [newDetailedTask.id]: newDetailedTask } },
						columns: {
							[newDetailedTask.columnId]: {
								taskIds: { $push: [newDetailedTask.id] }
							}
						}
					}
				}
			})
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

			return stateCopy

		// TODO: fix lagging move of +Add Task on moving last task from column
		case 'editTask':
			const updatedTask = {
				id: action.payload.taskId,
				title: action.payload.title,
				color: action.payload.color,
				owner: action.payload.owner
			}
			if (action.payload.sourceColumn !== action.payload.destinationColumn) {
				return update(state, {
					taskLists: {
						[state.activeList]: {
							tasks: { 
								[action.payload.taskId]: {$set: updatedTask } },
							columns: {
								[action.payload.sourceColumn]: {
									taskIds: { $splice: [[action.payload.index,1]]}
								},
								[action.payload.destinationColumn]: {
									taskIds: { $push: [action.payload.taskId]}
								}  
							}
						}
					}
				})}
			else return update(state, {
				taskLists: {
					[state.activeList]: {
						tasks: { 
							[action.payload.taskId]: {$set: updatedTask } }
					}
				}
			})
		case 'deleteTask':
			return update(state, {
				taskLists: {
					[state.activeList]: {
						tasks: { $unset: [action.payload.taskId] },
						columns: {
							[action.payload.columnId]: {
								taskIds: { $splice: [[action.payload.index, 1]]}
							}
						}
					}
				}
			})
		case 'changeTaskColor':
			return update(state, {
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
		default:
			throw new Error()
	}
}

const App = () => {
	const [appData, dispatch] = useReducer(reducer, initialState)

	const handleListSwitch = event => {
		dispatch({
			type: 'selectList',
			payload: { selectedList: event.target.innerText }
		})
	}

	return (
		<>
			<Flex>
				<SideBar
					taskLists={appData.listOrder}
					activeList={appData.activeList}
					onListSwitch={handleListSwitch}
					dispatch={dispatch}
				/>
				<Body
					taskListData={appData}
					activeList={appData.activeList}
					dispatch={dispatch}
				/>
			</Flex>
			<Footer />
		</>
	)
}

export default App

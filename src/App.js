import { useReducer } from 'react'
import Body from './Body'
import Footer from './layout/Footer'
import SideBar from './layout/SideBar'
import { Flex } from '@chakra-ui/react'
import initialState from './data'
import { v4 as uuidv4 } from 'uuid'
import update from 'immutability-helper'

const reducer = (state, action) => {
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
			const currentIndex = state.listOrder.findIndex(
				list => list === action.payload.listName
			)
			const replaceListName = listName => action.payload.newName
			return update(state, {
				taskLists: {
					[action.payload.listName]: {
						name: { $set: action.payload.newName }
					},
					[action.payload.listName]: replaceListName // TODO: check if necessary
				},
				listOrder: {
					$splice: [[currentIndex, 1, action.payload.newName]]
				}
			})
		case 'selectList':
			return update(state, {
				activeList: { $set: action.payload.selectedList }
			})
		case 'moveList':
			return ''

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
			return {
				...state,
				...state.taskLists[state.activeList].columnOrder.splice(
					action.payload.sourceIndex,
					1
				),
				...state.taskLists[state.activeList].columnOrder.splice(
					action.payload.destinationIndex,
					0,
					action.payload.draggableId
				)
			}
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
				color: '#EAEAEA'
			}

			return update(state, {
				taskLists: {
					[action.payload.activeList]: {
						tasks: { $merge: { [newTask.id]: newTask } },
						columns: {
							[action.payload.columnId]: {
								taskIds: { $push: [newTask.id] }
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
			return {
				...state,
				...state.taskLists[state.activeList].columns[
					sourceColumn
				].taskIds.splice(sourceIndex, 1),
				...state.taskLists[state.activeList].columns[
					destinationColumn
				].taskIds.splice(destinationIndex, 0, draggableId)
			}
		case 'editTask':
			// TODO
			return ''
		case 'deleteTask':
			// TODO
			return ''
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

import { useEffect, useState, useReducer, useRef } from 'react'
import Body from './Body'
import SideBar from './layout/SideBar'
import { Flex, useMediaQuery } from '@chakra-ui/react'
// import initialState from './data'
import taskReducer from './reducers/task-reducer'
import { doc, getDoc } from 'firebase/firestore'
import { db } from './index'

const activeUser = 'userId'

const App = () => {
	const [appData, dispatch] = useReducer(taskReducer, {
		listOrder: [],
		taskLists: {},
		activeList: ''
	})
	const isFirstRender = useRef(true)

	useEffect(() => {
		if (isFirstRender) {
			const loadData = async () => {
				const getFirebaseData = async uuid => {
					try {
						const retrievedDoc = await getDoc(
							doc(db, uuid, 'taskListData')
						)
						return retrievedDoc.data()
					} catch (err) {
						console.error(`Failed to load user data: ${err}`)
					}
				}
				const userData = await getFirebaseData(activeUser)
				dispatch({ type: 'loadData', payload: userData })
			}
			loadData()
		}
		isFirstRender.current = false
		setIsLoading(false)
	}, [])

	const [isLoading, setIsLoading] = useState(true)
	const [menuIsToggled, setMenuIsToggled] = useState(false)
	const [isSmallerThan768] = useMediaQuery('(max-width: 767px)')

	const handleListSwitch = event => {
		dispatch({
			type: 'selectList',
			payload: { selectedList: event.target.innerText }
		})
	}

	const toggleMenu = () => {
		setMenuIsToggled(prevState => !prevState)
	}

	return (
		<>
			{isLoading ? (
				'Loading...'
			) : (
				<Flex direction={{ base: 'column', md: 'row' }}>
					{(!isSmallerThan768 || menuIsToggled) && (
						<SideBar
							taskLists={appData.listOrder}
							activeList={appData.activeList}
							onListSwitch={handleListSwitch}
							dispatch={dispatch}
							menuIsToggled={menuIsToggled}
							toggleMenu={toggleMenu}
						/>
					)}
					{appData.activeList
						? !menuIsToggled && (
								<Body
									taskListData={appData}
									activeList={appData.activeList}
									dispatch={dispatch}
									toggleMenu={toggleMenu}
									menuIsToggled={menuIsToggled}
									isSmallerThan768={isSmallerThan768}
								/>
						  )
						: 'Please add a list to get started'}
				</Flex>
			)}
		</>
	)
}

export default App

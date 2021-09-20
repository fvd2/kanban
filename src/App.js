import { useEffect, useState, useReducer, useRef } from 'react'
import Body from './Body'
import SideBar from './layout/SideBar'
import { Flex, useMediaQuery } from '@chakra-ui/react'
import taskReducer from './reducers/task-reducer'
import { doc, getDoc } from 'firebase/firestore'
import { db } from './services/firebase'
import SignIn from './components/auth/SignIn'
import { useContext } from 'react'
import { AuthContext } from './context/auth-context'

const App = () => {
	const [appData, dispatch] = useReducer(taskReducer, {
		listOrder: [],
		taskLists: {},
		activeList: ''
	})
	const isFirstRender = useRef(true)
	const userContext = useContext(AuthContext)

	useEffect(() => {
		if (isFirstRender && userContext.isLoggedIn) {
			setIsLoading(true)
			const loadData = async () => {
				const getFirebaseData = async uid => {
					try {
						const retrievedDoc = await getDoc(
							doc(db, uid, 'taskListData')
						)
						return retrievedDoc.data()
					} catch (err) {
						console.error(`Failed to load user data: ${err}`)
					}
				}
				const userData = await getFirebaseData(userContext.userId)
				if (userData)
					dispatch({
						type: 'loadData',
						payload: { userData, userId: userContext.userId }
					})
				else return
			}
			loadData()
		}
		isFirstRender.current = false
		setIsLoading(false)
	}, [userContext.isLoggedIn, userContext.userId])

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

	return userContext.isLoggedIn ? (
		isLoading ? (
			'Loading...'
		) : (
			<Flex direction={{ base: 'column', md: 'row' }}>
				{(!isSmallerThan768 || menuIsToggled) && (
					<SideBar
						onSignOut={userContext.handleSignOut}
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
								userId={userContext.userId}
								dispatch={dispatch}
								toggleMenu={toggleMenu}
								menuIsToggled={menuIsToggled}
								isSmallerThan768={isSmallerThan768}
							/>
					  )
					: 'Please add a list to get started'}
			</Flex>
		)
	) : (
		<SignIn onSignIn={userContext.handleSignIn} />
	)
}

export default App

import { useEffect, useState, useReducer, useRef } from 'react'
import Body from './Body'
import SideBar from './layout/SideBar'
import {
	Flex,
	IconButton,
	Spinner,
	Text,
	useMediaQuery
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import taskReducer from './reducers/task-reducer'
import { doc, getDoc } from 'firebase/firestore'
import { db } from './services/firebase'
import SignIn from './components/auth/SignIn'
import { useContext } from 'react'
import { AuthContext } from './context/auth-context'

const App = () => {
	const userContext = useContext(AuthContext)
	const [isLoading, setIsLoading] = useState(true)
	const isFirstRender = useRef(true)

	useEffect(() => {
		if (isFirstRender) {
			if (userContext.userId) {
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
					if (userData) {
						dispatch({
							type: 'loadData',
							payload: { userData, userId: userContext.userId }
						})
					} else return
				}
				loadData()
			}
		}
		setTimeout(() => {
			isFirstRender.current = false
			setIsLoading(false)
		}, 500)
	}, [userContext.isLoggedIn, userContext.userId])

	const [menuIsToggled, setMenuIsToggled] = useState(false)
	const [isSmallerThan768] = useMediaQuery('(max-width: 767px)')
	const [appData, dispatch] = useReducer(taskReducer, {
		listOrder: [],
		taskLists: {},
		activeList: ''
	})

	const handleListSwitch = event => {
		dispatch({
			type: 'selectList',
			payload: { userId: userContext.userId, selectedList: event.target.innerText }
		})
	}

	const toggleMenu = () => {
		setMenuIsToggled(prevState => !prevState)
	}

	const loadingSpinner = (
		<Flex justify="center" mt={5}>
			<Spinner
			thickness="4px"
			speed="0.65s"
			emptyColor="#F4F4F4"
			color="#424874"
			size="xl"
		/>
			</Flex>
	)

	return isLoading ? (
		loadingSpinner
	) : !userContext.isLoggedIn ? (
		<SignIn onSignIn={userContext.handleSignIn} />
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
			{appData.activeList && !menuIsToggled ? (
				<Body
					taskListData={appData}
					activeList={appData.activeList}
					userId={userContext.userId}
					dispatch={dispatch}
					toggleMenu={toggleMenu}
					menuIsToggled={menuIsToggled}
					isSmallerThan768={isSmallerThan768}
				/>
			) : (
				<Flex
					bg="#F4F4F4"
					minWidth="fit-content"
					width="100%"
					height="100vh">
					{isSmallerThan768 && (
						<IconButton
							mt={3} ml={3}
							onClick={toggleMenu}
							isRound={true}
							size="xs"
							bgColor="#424874"
							color="white"
							_hover={{ bgColor: '#292D48' }}
							icon={<HamburgerIcon />}
							mr={5}
						/>
					)}
					<Text mt={3} ml={3}>
						Please add a new task list to get started
					</Text>
				</Flex>
			)}
		</Flex>
	)
}

export default App

import { useEffect, useState, useReducer, useRef } from 'react'
import Body from './Body'
import SideBar from './layout/SideBar'
import {
	Alert,
	AlertIcon,
	AlertTitle,
	AlertDescription,
	Button,
	CloseButton,
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

	// prompt user to optionally pre-populate the app with dummy data
	useEffect(() => {
		setTimeout(() => {
			setAlertIsOpen(true)
		}, 3000)
	}, [userContext.isLoggedIn])

	const [menuIsToggled, setMenuIsToggled] = useState(false)
	const [isSmallerThan768] = useMediaQuery('(max-width: 767px)')
	const [appData, dispatch] = useReducer(taskReducer, {
		listOrder: [],
		taskLists: {},
		activeList: ''
	})
	const [alertIsOpen, setAlertIsOpen] = useState(false)

	const handleListSwitch = event => {
		dispatch({
			type: 'selectList',
			payload: {
				userId: userContext.userId,
				selectedList: event.target.innerText
			}
		})
	}

	const toggleMenu = () => {
		setMenuIsToggled(prevState => !prevState)
	}

	const populateWithDummyData = () => {
		dispatch({
			type: 'prePopulateApp',
			payload: { userId: userContext.userId }
		})
		setAlertIsOpen(false)
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

	const prePopulateAlert = (
		<Alert status="info" px={5} py={5}>
			<AlertIcon />
			<AlertTitle>Care for some dummy data?</AlertTitle>
			<AlertDescription mr={3}>
				To quickly see what this app can do for you
			</AlertDescription>
			<Button
				onClick={populateWithDummyData}
				mr={3}
				variant="solid"
				size="sm"
				p={2}
				colorScheme="blue">
				Yes, please!
			</Button>
			<CloseButton onClick={() => setAlertIsOpen(false)}></CloseButton>
		</Alert>
	)

	return isLoading ? (
		loadingSpinner
	) : !userContext.isLoggedIn ? (
		<SignIn onSignIn={userContext.handleSignIn} />
	) : (
		appData && (
			<Flex direction="column" height="100vh">
				{alertIsOpen && prePopulateAlert}
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
						<Flex bg="#F4F4F4" minWidth="fit-content" width="100%">
							{isSmallerThan768 && (
								<IconButton
									mt={3}
									ml={3}
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
			</Flex>
		)
	)
}

export default App

import { useContext, useEffect, useState, useReducer, useRef } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from './services/firebase'
import { AuthContext } from './context/auth-context'
import Layout from './layout/Layout'
import LoadingSpinner from './ui/LoadingSpinner'
import SignIn from './components/auth/SignIn'
import TaskReducer from './reducers/task-reducer'

const App = () => {
	const userContext = useContext(AuthContext)
	const [isLoading, setIsLoading] = useState(true)
	const isFirstRender = useRef(true)
	const [infoIsOpen, setInfoIsOpen] = useState(false)
	const [appData, dispatch] = useReducer(TaskReducer, {
		listOrder: [],
		taskLists: {},
		activeList: ''
	})

	const toggleInfoBar = () => {
		setInfoIsOpen(prevState => !prevState)
	}

	// on first render, load existing user data (if available)
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
		isFirstRender.current = false
		setIsLoading(false)
	}, [userContext.isLoggedIn, userContext.userId])

	// prompt user to optionally pre-populate the app with dummy data
	// and only once by storing the response in session storage

	useEffect(() => {
		if (!sessionStorage.getItem('kanban-alert-seen')) {
			setTimeout(() => toggleInfoBar(), 3000)
			sessionStorage.setItem('kanban-alert-seen', 'true')
		}
	}, [])

	const populateWithDummyData = () => {
		dispatch({
			type: 'prePopulateApp',
			payload: { userId: userContext.userId }
		})
		toggleInfoBar()
	}

	// order: (1) check if loading, (2) check if logged in, (3) render board data
	return isLoading ? (
		<LoadingSpinner />
	) : !userContext.isLoggedIn ? (
		<SignIn onSignIn={userContext.handleSignIn} />
	) : (
		appData && (
			<Layout
				appData={appData}
				dispatch={dispatch}
				infoIsOpen={infoIsOpen}
				toggleInfoBar={toggleInfoBar}
				populateWithDummyData={populateWithDummyData}
			/>
		)
	)
}

export default App

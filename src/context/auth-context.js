import { createContext, useEffect, useState } from 'react'
import {
	browserLocalPersistence,
	GoogleAuthProvider,
	GithubAuthProvider,
	onAuthStateChanged,
	signInAnonymously,
	signInWithPopup,
	signOut,
	setPersistence
} from 'firebase/auth'
import { auth } from '../services/firebase'

const AuthContextProvider = ({ children }) => {
	const [user, setUser] = useState({
		isLoggedIn: false,
		displayName: 'Guest',
		uid: '',
		email: ''
	})

	useEffect(() => {
		onAuthStateChanged(auth, user => {
			if (user) {
				setUser({
					isLoggedIn: true,
					displayName: auth.currentUser.displayName,
					uid: auth.currentUser.uid,
					email: auth.currentUser.email
				})
			}
		})
	}, [])

	const handleSignIn = async provider => {
		try {
			let res
			await setPersistence(auth, browserLocalPersistence)
			const providers = {
				google: new GoogleAuthProvider(),
				github: new GithubAuthProvider()
			}
			if (provider === 'anonymous') {
				res = await signInAnonymously(auth)
				setUser(prevState => ({
					isLoggedIn: !prevState.isLoggedIn,
					displayName: 'Guest',
					uid: res.user.uid,
					email: ''
				}))
			} else {
				res = await signInWithPopup(auth, providers[provider])
				setUser(prevState => ({
					isLoggedIn: !prevState.isLoggedIn,
					displayName: res.user.displayName,
					uid: res.user.uid,
					email: res.user.email
				}))
			}
		} catch (error) {
			console.error(
				`An error occurred during social signin: ${error}`
			)
		}
	}

	const handleSignOut = async () => {
		await signOut(auth)
		setUser({ isloggedIn: false, displayName: 'Guest', uid: '' })
	}

	const AuthValues = {
		isLoggedIn: user.isLoggedIn,
		displayName: user.displayName,
		userId: user.uid,
		email: user.email,
		handleSignIn,
		handleSignOut
	}

	return (
		<AuthContext.Provider value={AuthValues}>
			{children}
		</AuthContext.Provider>
	)
}

export const AuthContext = createContext()
export default AuthContextProvider

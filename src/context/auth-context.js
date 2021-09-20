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
					displayName: auth.currentUser.displayName || '',
					uid: auth.currentUser.uid,
					email: auth.currentUser.email || 'Guest@guest.com'
				})
			}
		})
	}, [])

	const handleSignIn = async provider => {
		try {
			let res
			await setPersistence(auth, browserLocalPersistence)
			const providers = {
				Google: new GoogleAuthProvider(),
				GitHub: new GithubAuthProvider()
			}
			if (provider === 'anonymous') {
				res = await signInAnonymously(auth)
				setUser({
					isLoggedIn: true,
					displayName: 'Guest',
					uid: res.user.uid,
					email: ''
				})
			} else {
				res = await signInWithPopup(auth, providers[provider])
				setUser({
					isLoggedIn: true,
					displayName: res.user.displayName,
					uid: res.user.uid,
					email: res.user.email
				})
			}
		} catch (error) {
			console.error(`An error occurred during social signin: ${error}`)
		}
	}

	const handleSignOut = async () => {
		await signOut(auth)
		setUser({ isloggedIn: false, displayName: '', uid: '', email: '' })
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

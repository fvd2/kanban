import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check'

export const app = initializeApp({
	apiKey: 'AIzaSyDwkoDdGaD7u9en9tnXKizNQYlTdEHLaBE',
	authDomain: 'kanban-218d1.firebaseapp.com',
	databaseURL: 'https://kanban-218d1-default-rtdb.europe-west1.firebasedatabase.app',
	projectId: 'kanban-218d1',
	storageBucket: 'kanban-218d1.appspot.com',
	messagingSenderId: '759366593327',
	appId: '1:759366593327:web:0da81e7b41d2097ca70fda',
	measurementId: 'G-XZSFXHBR8L'
})

initializeAppCheck(app, {
	provider: new ReCaptchaV3Provider('6LcwJYMcAAAAANzbxb5adE_e3_CAJDCLG_SRbSQj'),  
	isTokenAutoRefreshEnabled: true})

export const db = getFirestore(app)
export const auth = getAuth(app)
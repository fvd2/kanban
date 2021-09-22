import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check'

export const app = initializeApp({
	apiKey: process.env.FIREBASE_APIKEY,
	authDomain: process.env.FIREBASE_AUTHDOMAIN,
	databaseURL: process.env.FIREBASE_AUTHDOMAIN,
	projectId: process.env.FIREBASE_PROJECTID,
	storageBucket: process.env.FIREBASE_STORAGEBUCKET,
	messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
	appId: process.env.FIREBASE_APPID,
	measurementId: process.env.FIREBASE_MEASUREMENTID
})

const appCheck = initializeAppCheck(app, {
	provider: new ReCaptchaV3Provider(process.env.RECAPTCHA_SITE_KEY),  
	isTokenAutoRefreshEnabled: true})

export const db = getFirestore(app)
export const auth = getAuth(app)

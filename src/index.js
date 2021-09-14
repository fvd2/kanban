import React from 'react'
import ReactDOM from 'react-dom'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import App from './App'
import theme from './theme'
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const app = initializeApp({
	apiKey: 'AIzaSyDwkoDdGaD7u9en9tnXKizNQYlTdEHLaBE',
	authDomain: 'kanban-218d1.firebaseapp.com',
	databaseURL:
		'https://kanban-218d1-default-rtdb.europe-west1.firebasedatabase.app',
	projectId: 'kanban-218d1',
	storageBucket: 'kanban-218d1.appspot.com',
	messagingSenderId: '759366593327',
	appId: '1:759366593327:web:0da81e7b41d2097ca70fda',
	measurementId: 'G-XZSFXHBR8L'
})

export const db = getFirestore(app)

ReactDOM.render(
  <React.StrictMode>
		<ColorModeScript initialColorMode={theme.config.initialColorMode} />
		<ChakraProvider theme={theme}>
			<App />
		</ChakraProvider>
	</React.StrictMode>,
	document.getElementById('root')
  )

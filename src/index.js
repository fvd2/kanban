import React from 'react'
import ReactDOM from 'react-dom'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import App from './App'
import theme from './theme'
import AuthContextProvider from './context/auth-context'

ReactDOM.render(
	<React.StrictMode>
		<ColorModeScript initialColorMode={theme.config.initialColorMode} />
		<ChakraProvider theme={theme}>
			<AuthContextProvider>
				<App />
			</AuthContextProvider>
		</ChakraProvider>
	</React.StrictMode>,
	document.getElementById('root')
)

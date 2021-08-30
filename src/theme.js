import { extendTheme } from '@chakra-ui/react'

const config = {
	initialColorMode: 'light',
	useSystemColorMode: true
}

export const colors = {
	tasks: {
		1: '#F56565',
		2: '#ED8936',
		3: '#48BB78',
		4: '#38B2AC',
		5: '#4299e1',
		6: '#9F7AEA'
	}
}

const theme = extendTheme({ config })

export default theme
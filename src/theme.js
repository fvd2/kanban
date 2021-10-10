import { extendTheme } from '@chakra-ui/react'

const config = {
	initialColorMode: 'light',
}

export const colors = {
	tasks: {
		1: '#F56565',
		2: '#ED8936',
		3: '#48BB78',
		4: '#38B2AC',
		5: '#4299e1',
		6: '#EAEAEA'
	}
}

const theme = extendTheme({ config })

export default theme

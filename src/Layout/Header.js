import {
	Avatar,
	IconButton,
	Flex,
	Heading,
	useColorMode
} from '@chakra-ui/react'
import { SunIcon, MoonIcon } from '@chakra-ui/icons'

const Header = () => {
	const { colorMode, toggleColorMode } = useColorMode()

	return (
		<Flex
			pl={5}
			pr={5}
			pt={1}
			pb={1}
			align="center"
			justify="space-between"
			bgGradient="linear(to-r, purple.600, cyan.600)">
			<Heading size="lg" color="white">
				Kanban
			</Heading>
			<Flex align="center">
				{colorMode === 'dark' ? (
					<IconButton
						bg="transparent"
						isRound={true}
						onClick={toggleColorMode}
						icon={<SunIcon />}
					/>
				) : (
					<IconButton
						bg="transparent"
						isRound={true}
						onClick={toggleColorMode}
						icon={<MoonIcon />}
					/>
				)}
				<Avatar ml={2} size="sm" />
			</Flex>
		</Flex>
	)
}

export default Header

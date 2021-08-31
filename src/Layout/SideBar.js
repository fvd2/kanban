import {
	Avatar,
	Flex,
	Heading,
	IconButton,
	Text,
	useColorMode
} from '@chakra-ui/react'
import { SunIcon, MoonIcon } from '@chakra-ui/icons'

const SideDrawer = () => {
	const { colorMode, toggleColorMode } = useColorMode()
	return (
		<Flex direction="column" pt={5} pl={5} pr={5} bg="#424874" width="auto">
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
			<Heading size="md" mb={3} color="white">
				Task lists
			</Heading>
			<Flex>
				<Text size="md" color="white">
					Programming
				</Text>
			</Flex>
			<Text size="md" color="white">
				School
			</Text>
			<Text size="md" color="white">
				Work
			</Text>
			<Text size="md" color="white">
				+ Add List
			</Text>
		</Flex>
	)
}

export default SideDrawer

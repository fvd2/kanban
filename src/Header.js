import { Flex, Heading, Avatar } from '@chakra-ui/react'

const Header = () => {
	return (
		<Flex
			pl={5}
			pr={5}
			pt="0.5em"
			pb="0.5em"
			align="center"
			justify="space-between"
			bgGradient="linear(to-r, purple.600, cyan.600)">
			<Heading size="lg" color="white">Kanban</Heading>
            <Avatar size="sm"/>
		</Flex>
	)
}

export default Header

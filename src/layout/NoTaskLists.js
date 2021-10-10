import { Flex, IconButton, Text } from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'

const NoTaskLists = ({ isSmallerThan768, toggleMenu }) => {
	return (
		<Flex bg="#F4F4F4" minWidth="fit-content" width="100%">
			{isSmallerThan768 && (
				<IconButton
					mt={3}
					ml={3}
					onClick={toggleMenu}
					isRound={true}
					size="xs"
					bgColor="#424874"
					color="white"
					_hover={{ bgColor: '#292D48' }}
					icon={<HamburgerIcon />}
					mr={5}
				/>
			)}
			<Text mt={3} ml={3}>
				Please add a new task list to get started
			</Text>
		</Flex>
	)
}

export default NoTaskLists

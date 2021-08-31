import { useState } from 'react'
import {
	Avatar,
	Flex,
	Heading,
	IconButton,
	Text,
	useColorMode
} from '@chakra-ui/react'
import ListAddNew from '../components/ListAddNew'
import { SunIcon, MoonIcon } from '@chakra-ui/icons'

const SideBar = ({ taskLists, activeList, onListSwitch, onListSubmit }) => {
	const { colorMode, toggleColorMode } = useColorMode()
	const [isOpen, setIsOpen] = useState(false)
	const toggleAddList = () => {
		setIsOpen(prevState => !prevState)
	}

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
			<Flex direction="column">
				{taskLists.map(listName => {
					if (listName === activeList) {
						return (
							<Text
								key={listName}
								cursor="pointer"
								size="md"
								as="b"
								color="white"
								onClick={onListSwitch}>
								{listName}
							</Text>
						)
					} else {
						return (
							<Text
								key={listName}
								cursor="pointer"
								size="md"
								color="white"
								onClick={onListSwitch}>
								{listName}
							</Text>
						)
					}
				})}
				{!isOpen ? (
					<Text
					size="md" color="white"
						onClick={toggleAddList}>
						+ Add List
					</Text>
				) : (
					<ListAddNew
						onSubmit={onListSubmit}
						hideInput={toggleAddList}
						isOpen={isOpen}
					/>
				)}
			</Flex>
		</Flex>
	)
}

export default SideBar

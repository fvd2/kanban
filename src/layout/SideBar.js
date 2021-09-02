import {
	Avatar,
	Flex,
	Heading,
	IconButton,
	useColorMode
} from '@chakra-ui/react'
import { SunIcon, MoonIcon } from '@chakra-ui/icons'
import TaskListOverview from '../components/TaskListOverview'

const SideBar = ({
	taskLists,
	activeList,
	onListSwitch,
	dispatch
}) => {
	const { colorMode, toggleColorMode } = useColorMode()

	return (
		<Flex direction="column" pt={5} pl={5} pr={5} bg="#424874" width="400px">
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
			<TaskListOverview taskLists={taskLists} activeList={activeList} dispatch={dispatch} onListSwitch={onListSwitch}/>

		</Flex>
	)
}

export default SideBar

import {
	Flex,
	Heading,
	IconButton,
} from '@chakra-ui/react'
import { DragDropContext } from 'react-beautiful-dnd'
import { CloseIcon } from '@chakra-ui/icons'
import TaskListOverview from '../components/TaskListOverview'

const SideBar = ({ taskLists, activeList, onListSwitch, dispatch, menuIsToggled, toggleMenu }) => {

	const handleOnDragEnd = result => {
		if (!result.destination) return
		dispatch({
			type: 'moveList',
			payload: {
				sourceIndex: result.source.index,
				destinationIndex: result.destination.index,
				draggableId: result.draggableId
			}
		})
	}

	console.log(menuIsToggled)


	return (
		<DragDropContext onDragEnd={handleOnDragEnd}>
			<Flex
				direction="column"
				pt={5}
				pl={5}
				pr={5}
				bg="#424874"
				w={{ base: '100%', md: 'auto', lg: '25%', xl: '15%'}}>
				<Flex justify="space-between">
				<Heading size="md" mb={3} color="white">
					Task Lists
				</Heading>
				{menuIsToggled ? (
							<IconButton
								colorScheme="whiteAlpha"
								onClick={toggleMenu}
								size="xs"
								icon={<CloseIcon />}
							/>
						) : <IconButton variant="unstyled"/> }
				</Flex>
				<TaskListOverview
					taskLists={taskLists}
					activeList={activeList}
					dispatch={dispatch}
					onListSwitch={onListSwitch}
				/>
			</Flex>
		</DragDropContext>
	)
}

export default SideBar

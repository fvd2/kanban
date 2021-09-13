import { Flex, Heading, IconButton } from '@chakra-ui/react'
import { DragDropContext } from 'react-beautiful-dnd'
import { CloseIcon } from '@chakra-ui/icons'
import TaskListOverview from '../components/TaskListOverview'

const SideBar = ({
	taskLists,
	activeList,
	onListSwitch,
	dispatch,
	menuIsToggled,
	toggleMenu
}) => {
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

	return (
		<DragDropContext onDragEnd={handleOnDragEnd}>
			<Flex
				direction="column"
				bg="#424874"
				minHeight="100vh"
				w={{ base: '100%', md: 'auto', lg: '25%', xl: '20%' }}>
				<Flex justify="space-between">
					<Heading
						size="md"
						mb={3}
						mt={5}
						ml={5}
						mr={5}
						color="white">
						Task Lists
					</Heading>
					{menuIsToggled ? (
						<IconButton
							mt={5}
							mr={5}
							colorScheme="whiteAlpha"
							onClick={toggleMenu}
							size="xs"
							isRound={true}
							icon={<CloseIcon />}
						/>
					) : (
						<div
							mt={5}
							mr={5}
						/>
					)}
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

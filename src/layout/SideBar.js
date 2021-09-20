import {
	Avatar,
	Button,
	Flex,
	Heading,
	IconButton,
	Text
} from '@chakra-ui/react'
import { DragDropContext } from 'react-beautiful-dnd'
import { CloseIcon } from '@chakra-ui/icons'
import TaskListOverview from '../components/TaskListOverview'
import { useContext, useState } from 'react'
import { AuthContext } from '../context/auth-context'

const SideBar = ({
	userId,
	onSignOut,
	taskLists,
	activeList,
	onListSwitch,
	dispatch,
	menuIsToggled,
	toggleMenu
}) => {
	const [signOutButtonIsOpen, setSignOutButtonIsOpen] = useState(false)
	const userContext = useContext(AuthContext)

	const handleOnDragEnd = result => {
		if (!result.destination) return
		dispatch({
			type: 'moveList',
			payload: {
				userId,
				sourceIndex: result.source.index,
				destinationIndex: result.destination.index,
				draggableId: result.draggableId
			}
		})
	}

	const toggleSignOutButton = (event) => {
		if (event.type === 'mouseenter') {
			setSignOutButtonIsOpen(true)
		}
		if (event.type === 'mouseleave') {
			setSignOutButtonIsOpen(false)
		}
	}

	const emailPrefix = userContext.email ? userContext.email.split('@')[0] : 'Guest'

	return (
		<DragDropContext onDragEnd={handleOnDragEnd}>
			<Flex
				direction="column"
				bg="#424874"
				minHeight="100vh"
				w={{ base: '100%', md: 'auto', lg: '25%', xl: '20%' }}>
				<Flex
					mt={3}
					ml={5}
					align="center"
					onMouseEnter={toggleSignOutButton}
					onMouseLeave={toggleSignOutButton}>
					{signOutButtonIsOpen ? (
						<Button onClick={onSignOut} size="xs">
							SignOut
						</Button>
					) : (
						<>
							<Avatar size="xs" color="#FFFFFF" mr={2} />
							<Text color="#FFFFFF" isTruncated>
								{emailPrefix}
							</Text>
						</>
					)}
				</Flex>
				<Flex>
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
						<div mt={5} mr={5} />
					)}
				</Flex>
				<TaskListOverview
					taskLists={taskLists}
					activeList={activeList}
					dispatch={dispatch}
					userId={userContext.userId}
					onListSwitch={onListSwitch}
				/>
			</Flex>
		</DragDropContext>
	)
}

export default SideBar

import { useState } from 'react'
import { Flex, Text } from '@chakra-ui/react'
import ListAddNew from '../components/ListAddNew'
import TaskListItem from './TaskListItem'
import { Droppable } from 'react-beautiful-dnd'

const TaskListOverview = ({
	userId,
	taskLists,
	activeList,
	onListSwitch,
	dispatch
}) => {
	const [isOpen, setIsOpen] = useState(false)

	const toggleAddList = () => {
		setIsOpen(prevState => !prevState)
	}

	const handleDeleteList = listName => {
		dispatch({ type: 'deleteList', payload: { userId, listName } })
	}

	const handleSubmitList = (listName, newName) => {
		dispatch({ type: 'renameList', payload: { userId, listName, newName }})
	}

	const handleNewList = listName => {
		dispatch({ type: 'addList', payload: { userId, listName }})
	}

	return (
		<Droppable droppableId="board" type="column" direction="vertical">
			{provided => (
				<Flex
					direction="column"
					ref={provided.innerRef}
					{...provided.droppableProps}>
					{taskLists.map((listName, index) => {
						return (
							<TaskListItem
								key={listName}
								id={listName}
								index={index}
								listName={listName}
								onDelete={handleDeleteList}
								onListSubmit={handleSubmitList}
								activeList={activeList}
								onListSwitch={onListSwitch}
							/>
						)
					})}
					{provided.placeholder}
					{!isOpen ? (
						<Text
							pt={3}
							pb={3}
							pl={5}
							pr={5}
							size="md"
							color="white"
							onClick={toggleAddList}>
							+ Add List
						</Text>
					) : (
						<ListAddNew
							pt={3}
							pb={3}
							pl={5}
							pr={5}
							onSubmit={handleNewList}
							hideInput={toggleAddList}
						/>
					)}
				</Flex>
			)}
		</Droppable>
	)
}

export default TaskListOverview

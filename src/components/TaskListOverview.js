import { useState } from 'react'
import { Flex, Text } from '@chakra-ui/react'
import ListAddNew from '../components/ListAddNew'
import TaskListItem from './TaskListItem'
import { Droppable } from 'react-beautiful-dnd'

const TaskListOverview = ({
	taskLists,
	activeList,
	onListSwitch,
	dispatch
}) => {
	const [isOpen, setIsOpen] = useState(false)
	const toggleAddList = () => {
		setIsOpen(prevState => !prevState)
	}

	const handleList = typeAndPayload => {
		dispatch(typeAndPayload)
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
								onDelete={handleList}
								onListSubmit={handleList}
								activeList={activeList}
								onListSwitch={onListSwitch}
							/>
						)
					})}
							{provided.placeholder}
					{!isOpen ? (
						<Text size="md" color="white" onClick={toggleAddList}>
							+ Add List
						</Text>
					) : (
						<ListAddNew
							onSubmit={handleList}
							hideInput={toggleAddList}
							isOpen={isOpen}
						/>
					)}
				</Flex>
			)}
		</Droppable>
	)
}

export default TaskListOverview

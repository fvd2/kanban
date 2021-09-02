import { useState } from 'react'
import { Flex, Text } from '@chakra-ui/react'
import ListAddNew from '../components/ListAddNew'
import TaskListItem from './TaskListItem'

const TaskListOverview = ({ taskLists, activeList, onSubmit, onListSwitch, dispatch }) => {
	const [isOpen, setIsOpen] = useState(false)
	const toggleAddList = () => {
		setIsOpen(prevState => !prevState)
	}

    const handleList = typeAndPayload => {
		dispatch(typeAndPayload)
	}

	return (
		<Flex direction="column">
			{taskLists.map(listName => {
				return <TaskListItem key={listName} listName={listName} onDelete={handleList} onListSubmit={handleList} activeList={activeList} onListSwitch={onListSwitch}/>
			})}
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
	)
}

export default TaskListOverview

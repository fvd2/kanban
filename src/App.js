import { useState, useReducer } from 'react'
import Body from './Body'
import Footer from './layout/Footer'
import SideBar from './layout/SideBar'
import { Flex } from '@chakra-ui/react'

const App = () => {
	const [activeList, setActiveList] = useState('Programming')
	const [taskLists, setTaskLists] = useState(['Programming', 'Work'])

	

	const handleListSwitch = event => {
		setActiveList(event.target.outerText)
	}

	const handleNewList = listName =>
		setTaskLists(prevState => {
			if (!prevState.includes(listName)) return [...prevState, listName]
			return
		})

	return (
		<>
			<Flex>
				<SideBar
					taskLists={taskLists}
					activeList={activeList}
					onListSwitch={handleListSwitch}
					onListSubmit={handleNewList}
				/>
				<Body activeList={activeList} taskLists={taskLists} />
			</Flex>
			<Footer />
		</>
	)
}

export default App

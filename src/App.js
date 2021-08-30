import Header from './Header'
import Board from './Board'
import Footer from './Footer'
import SideBar from './SideBar'
import { Flex } from '@chakra-ui/react'

const App = () => {
	return (
		<>
			<Header />
			<Flex>
				<SideBar />
				<Board />
			</Flex>
			<Footer />
		</>
	)
}

export default App

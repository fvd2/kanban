import Body from './Body'
import Footer from './Layout/Footer'
import SideBar from './Layout/SideBar'
import { Flex } from '@chakra-ui/react'

const App = () => {
	return (
		<>
			<Flex>
				<SideBar />
				<Body />
			</Flex>
			<Footer />
		</>
	)
}

export default App

import Header from './Layout/Header'
import Body from './Body'
import Footer from './Layout/Footer'
import SideBar from './Layout/SideBar'
import { Flex } from '@chakra-ui/react'

const App = () => {
	return (
		<>
			<Header />
			<Flex>
				<SideBar />
				<Body />
			</Flex>
			<Footer />
		</>
	)
}

export default App

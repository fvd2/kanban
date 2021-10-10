import { useContext, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { Flex, useDisclosure, useMediaQuery } from '@chakra-ui/react'

import { AuthContext } from '../context/auth-context'
import AlertComponent from '../ui/Alert'
import Body from './Body'
import MobileAlert from '../ui/MobileAlert'
import SideBar from './SideBar'
import NoTaskLists from './NoTaskLists'

const Layout = ({
	appData,
	dispatch,
	infoIsOpen,
	setInfoIsOpen,
	populateWithDummyData
}) => {
	const userContext = useContext(AuthContext)
	const {
		isOpen: alertIsOpen,
		onOpen: onOpenAlert,
		onClose: onCloseAlert
	} = useDisclosure({ defaultIsOpen: true })
	const [menuIsToggled, setMenuIsToggled] = useState(false)
	const [isSmallerThan768] = useMediaQuery('(max-width: 767px)')

	const handleListSwitch = event => {
		dispatch({
			type: 'selectList',
			payload: {
				userId: userContext.userId,
				selectedList: event.target.innerText
			}
		})
	}

	const toggleMenu = () => {
		setMenuIsToggled(prevState => !prevState)
	}

	return (
		<Flex direction="column" height="100vh" background="#F4F4F4">
			{isMobile && (
				<MobileAlert
					isOpen={alertIsOpen}
					onClose={onCloseAlert}
					onOpen={onOpenAlert}
				/>
			)}
			{infoIsOpen && (
				<AlertComponent
					status="info"
					title="Care for some dummy data?"
					description="To quickly see what this app can do for you"
					submitHandler={populateWithDummyData}
					closeHandler={() => setInfoIsOpen(false)}
				/>
			)}
			<Flex direction={{ base: 'column', md: 'row' }}>
				{(!isSmallerThan768 || menuIsToggled) && (
					<SideBar
						onSignOut={userContext.handleSignOut}
						taskLists={appData.listOrder}
						activeList={appData.activeList}
						onListSwitch={handleListSwitch}
						dispatch={dispatch}
						menuIsToggled={menuIsToggled}
						toggleMenu={toggleMenu}
					/>
				)}
				{appData.activeList && !menuIsToggled ? (
					<Body
						taskListData={appData}
						activeList={appData.activeList}
						userId={userContext.userId}
						dispatch={dispatch}
						toggleMenu={toggleMenu}
						menuIsToggled={menuIsToggled}
						isSmallerThan768={isSmallerThan768}
					/>
				) : (
					<NoTaskLists
						isSmallerThan768={isSmallerThan768}
						toggleMenu={toggleMenu}
					/>
				)}
			</Flex>
		</Flex>
	)
}

export default Layout

import { Flex, Heading, Text } from '@chakra-ui/react'

const SideDrawer = () => {
  

	return (<Flex direction="column" pt={5} pl={5} pr={5} bg="#424874" width="auto">
		<Heading size="md" mb={3} color="white">Task lists</Heading>
		<Flex><Text size="md" color="white">Programming</Text></Flex>
		<Text size="md" color="white">School</Text>
		<Text size="md" color="white">Work</Text>
		<Text size="md" color="white">+ Add List</Text>
	</Flex>
	)
}

export default SideDrawer

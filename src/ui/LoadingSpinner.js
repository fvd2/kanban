import { Flex, Spinner } from '@chakra-ui/react'

const LoadingSpinner = () => {
	return (
		<Flex justify="center" mt={5}>
			<Spinner
				thickness="4px"
				speed="0.65s"
				emptyColor="#F4F4F4"
				color="#424874"
				size="xl"
			/>
		</Flex>
	)
}

export default LoadingSpinner
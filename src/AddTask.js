import { Button, Flex, Input } from '@chakra-ui/react'
import { useState } from 'react'

const AddTask = ({ onSubmit }) => {
	const [action, setAction] = useState('')

	const handleChange = event => {
		setAction(event.target.value)
	}

	const handleSubmit = event => {
		event.preventDefault()
		onSubmit(action)
		setAction('')
	}

	return (
		<form onSubmit={handleSubmit}>
			<Flex>
				<Input
					value={action}
					placeholder="Your next task"
					onChange={handleChange}
				/>
				<Button type="submit" isDisabled={!action} colorScheme="blue">
					Add
				</Button>
			</Flex>
		</form>
	)
}

export default AddTask

import { useState, useRef, useEffect } from 'react'
import { Button, Flex, Input } from '@chakra-ui/react'

const TaskAddNew = ({ onSubmit, hideTaskInput, isOpen, columnId}) => {
	const [action, setAction] = useState('')
	const inputRef = useRef()

	useEffect(() => {
		if (isOpen) {
			inputRef.current.focus()
		}
	}, [isOpen])

	const handleChange = event => {
		setAction(event.target.value)
	}

	const handleSubmit = event => {
		event.preventDefault()
		if(action.trim().length > 0) {
			onSubmit(action, columnId)
			setAction('')
			hideTaskInput()
		}
		else {
			hideTaskInput()
		}
	}

	const handleBlur = () => {
		hideTaskInput()
	}

	return (
		<form onSubmit={handleSubmit}>
			<Flex>
				<Input
					ref={inputRef}
					value={action}
					placeholder="Your next task"
					onChange={handleChange}
					onBlur={handleBlur}
				/>
				<Button type="submit" isDisabled={!action} colorScheme="blue">
					Add
				</Button>
			</Flex>
		</form>
	)
}

export default TaskAddNew

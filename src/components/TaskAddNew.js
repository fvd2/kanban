import { useState, useRef, useEffect } from 'react'
import { Button, Flex, Input } from '@chakra-ui/react'

const TaskAddNew = ({ onAddTask, hideTaskInput, isOpen, columnId }) => {
	const [taskTitle, setTaskTitle] = useState('')
	const inputRef = useRef()

	useEffect(() => {
		if (isOpen) {
			inputRef.current.focus()
		}
	}, [isOpen])

	const handleChange = event => {
		setTaskTitle(event.target.value)
	}

	const handleSubmit = event => {
		event.preventDefault()
		if(taskTitle.trim().length > 0) {
			onAddTask(taskTitle, columnId)
			setTaskTitle('')
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
					value={taskTitle}
					placeholder="Your next task"
					onChange={handleChange}
					onBlur={handleBlur}
				/>
				<Button type="submit" isDisabled={!taskTitle} colorScheme="blue">
					Add
				</Button>
			</Flex>
		</form>
	)
}

export default TaskAddNew

import { useState, useRef, useEffect } from 'react'
import { Button, Flex, Input } from '@chakra-ui/react'

const ListAddNew = ({ onSubmit, hideInput, isOpen }) => {
	const [list, setList] = useState('')
	const inputRef = useRef()

	useEffect(() => {
		if (isOpen) {
			inputRef.current.focus()
		}
	}, [isOpen])

	const handleChange = event => {
		setList(event.target.value)
	}

	const handleSubmit = event => {
		event.preventDefault()
		if(list.trim().length > 0) {
			onSubmit(list)
			setList('')
			hideInput()
		}
		else {
			hideInput()
		}
	}

	const handleBlur = () => {
		hideInput()
	}

	return (
		<form onSubmit={handleSubmit}>
			<Flex>
				<Input
					ref={inputRef}
					value={list}
					placeholder="List name"
					onChange={handleChange}
					onBlur={handleBlur}
				/>
				<Button type="submit" isDisabled={!list} colorScheme="blue">
					Add
				</Button>
			</Flex>
		</form>
	)
}

export default ListAddNew

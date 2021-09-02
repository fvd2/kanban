import { useState, useRef, useEffect } from 'react'
import { Button, Flex, Input } from '@chakra-ui/react'

const ListAddNew = ({ hideInput, isOpen, onSubmit }) => {
	const [listName, setListName] = useState('')
	const inputRef = useRef()

	useEffect(() => {
		if (isOpen) {
			inputRef.current.focus()
		}
	}, [isOpen])

	const handleChange = event => {
		setListName(event.target.value)
	}

	const handleSubmit = event => {
		event.preventDefault()
		if(listName.trim().length > 0) {
			onSubmit({type: 'addList', payload: listName})
			setListName('')
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
					value={listName}
					placeholder="List name"
					onChange={handleChange}
					onBlur={handleBlur}
				/>
				<Button type="submit" isDisabled={!listName} colorScheme="blue">
					Add
				</Button>
			</Flex>
		</form>
	)
}

export default ListAddNew

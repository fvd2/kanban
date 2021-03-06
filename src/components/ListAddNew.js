import { useState, useRef, useEffect } from 'react'
import { Flex, Input } from '@chakra-ui/react'

const ListAddNew = ({ hideInput, onSubmit }) => {
	const [listName, setListName] = useState('')
	const inputRef = useRef()

	useEffect(() => {
		inputRef.current.focus()
	}, [])

	const handleChange = event => {
		setListName(event.target.value)
	}

	const handleSubmit = event => {
		event.preventDefault()
		if (listName.trim().length > 0) {
			onSubmit(listName)
			setListName('')
		}
		hideInput()
	}

	const handleBlur = (event) => {
		event.preventDefault() 
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
					colorScheme="whiteAlpha"
					color="white"
					size="sm"
					ml={5}
					mr={5}
					mt={3}
				/>
			</Flex>
		</form>
	)
}

export default ListAddNew

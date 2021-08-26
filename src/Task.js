import { Draggable } from 'react-beautiful-dnd'
import { Container } from '@chakra-ui/layout'

const Task = ({ id, index, content }) => {
	return (
		<Draggable draggableId={id} index={index}>
			{provided => (
				<Container bg="#D6E2E9" mb="5px" borderRadius="5px"
					{...provided.draggableProps}
					ref={provided.innerRef}
					{...provided.dragHandleProps}>
					<div>{content}</div>
				</Container>
			)}
		</Draggable>
	)
}

export default Task

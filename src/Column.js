import { Draggable, Droppable } from 'react-beautiful-dnd'
import { Container, Center, Heading } from '@chakra-ui/react'
import TaskList from './TaskList'

const Column = ({ id, title, tasks, index }) => {
	return (
		<Draggable draggableId={id} index={index}>
			{provided => (
				<Container
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					mr="1em"
					borderRadius="5px"
					bg="#F0EFEB">
					<Center>
						<Heading m={2} size={'lg'}>
							{title}
						</Heading>
					</Center>
					<Droppable droppableId={id} type="task" index={index}>
						{provided => (
							<div ref={provided.innerRef}>
								<TaskList
									{...provided.droppableProps}
									tasks={tasks}></TaskList>
								{provided.placeholder}
							</div>
						)}
					</Droppable>
					{provided.placeholder}
				</Container>

			)}
		</Draggable>
	)
}

export default Column

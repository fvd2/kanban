import Column from '../Components/Column'
import { Box, IconButton } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { Droppable } from 'react-beautiful-dnd'
import DUMMY_DATA from '../data'

const BoardView = ({
	data,
	onOpen,
	onDrop,
	onColumnSubmit,
	onTaskSubmit,
	onColorChange
}) => {
	return (
		<Droppable droppableId="board" type="column" direction="horizontal">
			{provided => (
				<>
					<Box
						display="flex"
						ref={provided.innerRef}
						{...provided.droppableProps}>
						{DUMMY_DATA.columnOrder.map((columnId, index) => (
							<Column
								width="250px"
								key={columnId}
								id={columnId}
								index={index}
								title={data.columns[columnId].title}
								taskIds={data.columns[columnId].taskIds}
								tasks={data.columns[columnId].taskIds.map(
									taskId => data.tasks[taskId]
								)}
								onDrop={onDrop}
								onColumnSubmit={onColumnSubmit}
								onTaskSubmit={onTaskSubmit}
								onColorChange={onColorChange}
							/>
							))}
							{provided.placeholder}
						<IconButton
							isRound={true}
							aria-label="Add column"
							icon={<AddIcon />}
							onClick={onOpen}
						/>
					</Box>
				</>
			)}
		</Droppable>
	)
}

export default BoardView

import Column from '../components/Column'
import { Box, IconButton } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { Droppable } from 'react-beautiful-dnd'

const BoardView = ({
	data,
	onOpen,
	onDrop,
	onColumnSubmit,
	onColorChange,
	onAddTask,
	onDeleteColumn,
	onDeleteTask,
	onSubmitEditedTask,
	columnTitlesToIds
}) => {
	return (
		<Droppable droppableId="board" type="column" direction="horizontal">
			{provided => (
				<>
					{data && (
						<Box
							display="flex"
							ref={provided.innerRef}
							{...provided.droppableProps}>
							{data.columnOrder.map((columnId, index) => (
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
									onColorChange={onColorChange}
									onAddTask={onAddTask}
									onDeleteColumn={onDeleteColumn}
									onDeleteTask={onDeleteTask}
									onSubmitEditedTask={onSubmitEditedTask}
									columns={Object.values(data.columns).map(column => column.title)}
									columnTitlesToIds={columnTitlesToIds}
								/>
							))}
							{provided.placeholder}
							<IconButton
								mt={6}
								{...data.columnOrder.length < 1 ? {marginLeft: 5 } : ''}
								size="xs"
								bgColor="#424874"
								color="#FFFFFF"
								_hover={{ bgColor: '#292D48'}}
								isRound={true}
								aria-label="Add column button"
								icon={<AddIcon />}
								onClick={onOpen}
							/>
						</Box>
					)}
				</>
			)}
		</Droppable>
	)
}

export default BoardView

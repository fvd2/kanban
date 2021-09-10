import { useState, useRef } from 'react'
import { Circle, IconButton, Portal, Tr, Td, useDisclosure } from '@chakra-ui/react'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import TaskView from '../views/TaskView'

const TableRow = ({
	columnTitle,
	columnId,
	taskId,
	taskTitle,
	taskOwner,
	taskColor,
	index,
	taskHandler,
	portalRef,
	onDeleteTask,
	columnTitlesToIds,
	columns
}) => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [tableViewIsOpen, setTableViewIsOpen] = useState(false)
	const btnRef = useRef()

	const toggleTaskView = () => {
		setTableViewIsOpen(true)
		onOpen()
	}

	const handleDeleteTask = () => {
		onDeleteTask(columnId, taskId, index)
	}

	return (
		<>
			{tableViewIsOpen && <Portal containerRef={portalRef}>
				<TaskView
					btnRef={btnRef}
					isOpen={isOpen}
					onClose={onClose}
					heading="Edit task"
					id={taskId}
					title={taskTitle}
					color={taskColor}
					owner={taskOwner}
					taskHandler={taskHandler}
					columns={columns}
					columnTitlesToIds={columnTitlesToIds}
					columnId={columnId}
					index={index}
				/>
			</Portal>}
			<Tr
				key={taskId}>
				<Td>{columnTitle}</Td>
				<Td>{taskTitle}</Td>
				<Td>{taskOwner}</Td>
				<Td><Circle
					size="20px"
					align="center"
					justify="center"
					border="1px solid black"
					m={0.5}
					bg={taskColor}/></Td>
					<Td>
						<IconButton
							size="xs"
							variant="unstyled"
							icon={<EditIcon />}
							onClick={toggleTaskView}
						/>
						<IconButton
							size="xs"
							variant="unstyled"
							icon={<DeleteIcon />}
							onClick={handleDeleteTask}
						/>
					</Td>
			</Tr>
		</>
	)
}

export default TableRow

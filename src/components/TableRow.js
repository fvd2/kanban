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
	const [optionsAreOpen, setOptionsAreOpen] = useState(false)
	const [tableViewIsOpen, setTableViewIsOpen] = useState(false)
	const btnRef = useRef()

	const toggleTaskView = () => {
		setTableViewIsOpen(true)
		onOpen()
	}
	const handleOptions = event => {
		if (event.type === 'mouseenter' || event.type === 'mouseover') {
			setOptionsAreOpen(true)
		}
		if (event.type === 'mouseleave') {
			setOptionsAreOpen(false)
		}
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
				key={taskId}
				onMouseEnter={handleOptions}
				onMouseOver={handleOptions}
				onMouseLeave={handleOptions}>
				<Td>{columnTitle}</Td>
				<Td>{taskTitle}</Td>
				<Td>{taskOwner}</Td>
				<Td><Circle
					size="20px"
					border="2px solid black"
					m={0.5}
					bg={taskColor}/></Td>
				{optionsAreOpen ? (
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
				) : (
					<Td>
						<IconButton size="xs" variant="unstyled" />
						<IconButton size="xs" variant="unstyled" />
					</Td>
				)}
			</Tr>
		</>
	)
}

export default TableRow

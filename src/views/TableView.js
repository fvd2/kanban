import { useState, useRef } from 'react'
import {
	Flex,
	Table,
	Thead,
	Tr,
	Th,
	Tbody,
	Td,
	Text,
	useDisclosure
} from '@chakra-ui/react'
import TaskView from './TaskView'

const TableView = ({ data, onAddNewDetailedTask, columnTitlesToIds }) => {
	const [taskViewIsOpen, setTaskViewIsOpen] = useState(false)
	const { isOpen, onOpen, onClose } = useDisclosure()
	const btnRef = useRef()

	const tableRows = Object.values(data.columns).map(column =>
		column.taskIds.map(task => (
			<Tr key={data.tasks[task].id}>
				<Td>{column.title}</Td>
				<Td>{data.tasks[task].title}</Td>
			</Tr>
		))
	)

	const submitNewDetailedTask = payload => {
		onAddNewDetailedTask(payload)
	}

	const toggleTaskView = () => {
		onOpen()
	}

	return (
		<Flex direction="column">
			<Table variant="simple">
				<Thead>
					<Tr>
						<Th>Category</Th>
						<Th>Task</Th>
						<Th>Owner</Th>
					</Tr>
				</Thead>
				<Tbody>{tableRows}</Tbody>
			</Table>
			{isOpen && <TaskView
				btnRef={btnRef}
				isOpen={isOpen}
				onClose={onClose}
				heading="Create new task"
				id={''}
				title={''}
				color="#EAEAEA"
				owner={''}
				taskHandler={submitNewDetailedTask}
				columns={data.columns}
				columnTitlesToIds={columnTitlesToIds}
			/>}
			<Text justify="center" color="#666666" onClick={toggleTaskView}>
				+ Add Task
			</Text>
		</Flex>
	)
}

export default TableView

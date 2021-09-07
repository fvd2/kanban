import { useRef } from 'react'
import {
	Flex,
	Table,
	Thead,
	Tr,
	Th,
	Tbody,
	Text,
	useDisclosure
} from '@chakra-ui/react'
import TaskView from './TaskView'
import TableRow from '../components/TableRow'

const TableView = ({ data, onAddNewDetailedTask, columnTitlesToIds, onSubmitEditedTask, onDeleteTask }) => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const btnRef = useRef()
	const portalRef = useRef()

	const submitNewDetailedTask = payload => {
		onAddNewDetailedTask(payload)
	}

	const submitEditedTask = (payload) => {
		onSubmitEditedTask(payload)
	}

	const toggleTaskView = () => {
		onOpen()
	}

	return (
		<Flex ref={portalRef} direction="column">
			<Table variant="simple">
				<Thead>
					<Tr>
						<Th>Category</Th>
						<Th>Task</Th>
						<Th>Owner</Th>
						<Th>Color</Th>
					</Tr>
				</Thead>
				<Tbody>
					{Object.values(data.columns).map(column =>
						column.taskIds.map((task, index) => (
							<TableRow
								key={data.tasks[task].id}
								columnTitle={column.title}
								columnId={column.id}
								taskId={data.tasks[task].id}
								taskTitle={data.tasks[task].title}
								taskOwner={data.tasks[task].owner}
								taskColor={data.tasks[task].color}
								index={index}
								portalRef={portalRef}
								taskHandler={submitEditedTask}
								onDeleteTask={onDeleteTask}
								columns={Object.values(data.columns).map(column => column.title)}
								columnTitlesToIds={columnTitlesToIds}
							/>
						))
					)}
				</Tbody>
			</Table>
			{isOpen && (
				<TaskView
					btnRef={btnRef}
					isOpen={isOpen}
					onClose={onClose}
					heading="Create new task"
					id={''}
					title={''}
					color="#EAEAEA"
					owner={''}
					taskHandler={submitNewDetailedTask}
					columns={Object.values(data.columns).map(column => column.title)}
					columnTitlesToIds={columnTitlesToIds}
				/>
			)}
			<Text justify="center" color="#666666" onClick={toggleTaskView}>
				+ Add Task
			</Text>
		</Flex>
	)
}

export default TableView

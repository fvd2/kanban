import { useRef } from 'react'
import {
	Box,
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

const TableView = ({
	data,
	onAddNewDetailedTask,
	columnTitlesToIds,
	onSubmitEditedTask,
	onDeleteTask
}) => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const btnRef = useRef()
	const portalRef = useRef()

	const submitNewDetailedTask = payload => {
		onAddNewDetailedTask(payload)
	}

	const submitEditedTask = payload => {
		onSubmitEditedTask(payload)
	}

	const toggleTaskView = () => {
		onOpen()
	}

	return (
		<Flex ref={portalRef} direction="column">
			<Box
				align="center"
				bg="#FFFFFF"
				mt={5}
				ml={5}
				p={0}
				border="1px solid #CACFD6"
				borderRadius={2}>
				<Table variant="simple" size="sm">
					<Thead bgColor="#5B8266">
						<Tr>
							<Th color="#FFFFFF">Category</Th>
							<Th color="#FFFFFF">Task</Th>
							<Th color="#FFFFFF">Owner</Th>
							<Th color="#FFFFFF">Color</Th>
							<Th color="#FFFFFF">Options</Th>
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
									columns={Object.values(data.columns).map(
										column => column.title
									)}
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
						columns={Object.values(data.columns).map(
							column => column.title
						)}
						columnId={Object.values(data.columns)[0].id}
						columnTitlesToIds={columnTitlesToIds}
					/>
				)}
				<Text fontSize="sm" ml={3} align="left" color="#666666" onClick={toggleTaskView}>
					+ Add Task
				</Text>
			</Box>
		</Flex>
	)
}

export default TableView

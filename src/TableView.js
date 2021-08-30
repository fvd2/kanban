import { Flex, Table, Thead, Tr, Th, Tbody, Td } from '@chakra-ui/react'

const TableView = ({ data, onTaskSubmit }) => {

	const tableRows = Object.values(data.columns).map(column =>
		column.taskIds.map(task => (
			<Tr key={data.tasks[task].id}>
				<Td>{column.title}</Td>
				<Td>{data.tasks[task].title}</Td>
			</Tr>
		)))

	return (
		<Flex direction="column">
		<Table variant="simple">
			<Thead>
				<Tr>
					<Th>Column</Th>
					<Th>Title</Th>
				</Tr>
			</Thead>
			<Tbody>{tableRows}</Tbody>
		</Table>
		</Flex>
	)
}

export default TableView

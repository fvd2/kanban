import { Draggable } from 'react-beautiful-dnd'
import {
	Avatar,
	Container,
	Flex,
	Heading,
	IconButton,
	Popover,
	PopoverContent,
	PopoverTrigger,
	Portal,
	Text
} from '@chakra-ui/react'
import { colors } from '../theme'

const Task = ({ id, index, title, color, owner, onColorChange }) => {

	const handleColorChange = (colorId, onClose) => {
		onColorChange(id, colors.tasks[colorId])
		onClose()
	}

	const availableColors = [1, 2, 3, 4, 5, 6]
	const colorButtons = onClose =>
		availableColors.map(colorId => (
			<IconButton
				key={colorId}
				m={0.5}
				size="xs"
				bg={colors.tasks[colorId]}
				isRound={true}
				variant="unstyled"
				onClick={() => handleColorChange(colorId, onClose)}
			/>
		))

	return (
		<>
			<Draggable draggableId={id} index={index}>
				{provided => (
					<Container
						justify="center"
						bg="white"
						m={0.5}
						p={2}
						border="1px solid #CACFD6"
						borderRadius={2}
						boxShadow={'2x1'}
						{...provided.draggableProps}
						ref={provided.innerRef}
						{...provided.dragHandleProps}>
						<Flex justify="space-between" align="top">
							<Heading size="sm">{title}</Heading>
							<Popover>
								{({ onClose }) => (
									<>
										<PopoverTrigger>
											<IconButton
												size="xs"
												rounded={50}
												bg={color}
												isRound={true}
												variant="unstyled"
											/>
										</PopoverTrigger>
										<Portal>
											<PopoverContent width="auto" p={1}>
												<Flex>
													{colorButtons(onClose)}
												</Flex>
											</PopoverContent>
										</Portal>
									</>
								)}
							</Popover>
						</Flex>
						<Text fontSize="2xs">{title}</Text>
						<Flex>
							<Avatar size="2xs"></Avatar>
							<Text fontSize="sm">{owner}</Text>
						</Flex>
					</Container>
				)}
			</Draggable>
		</>
	)
}

export default Task

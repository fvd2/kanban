import { Flex } from "@chakra-ui/react"
import Task from "./Task"

const TaskList = ({ tasks, onColorChange }) => {

    return (<Flex direction="column">
        {tasks.map((task, index) => <Task key={task.id} id={task.id} title={task.title} owner={task.owner} color={task.color} index={index} onColorChange={onColorChange}></Task>)}
        </Flex>)
}

export default TaskList
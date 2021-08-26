import { Flex } from "@chakra-ui/react"
import Task from "./Task"

const TaskList = ({ tasks }) => {
    return (<Flex direction="column">
        {tasks.map((task, index) => <Task key={task.id} id={task.id} content={task.content} index={index}></Task>)}
        </Flex>)
}

export default TaskList
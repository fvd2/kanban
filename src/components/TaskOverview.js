import { Flex } from "@chakra-ui/react"
import Task from "./Task"

const TaskOverview = ({ tasks, onColorChange, onDeleteTask, onSubmitEditedTask, columnId }) => {

    return (<Flex direction="column">
        {tasks.map((task, index) => <Task key={task.id} id={task.id} title={task.title} owner={task.owner} color={task.color} index={index} onColorChange={onColorChange} onDeleteTask={onDeleteTask} columnId={columnId} onSubmitEditedTask={onSubmitEditedTask}></Task>)}
        </Flex>)
}

export default TaskOverview
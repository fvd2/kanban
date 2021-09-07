import { render, screen } from '@testing-library/react'
import Body from './Body'
import data from './data'

it('renders column titles', () => {
    render(<Body taskListData={data} activeList={data.activeList} dispatch={() =>{}}/>)
    const columnTitle = screen.getByText(new RegExp(data.taskLists['Programming'].columns[data.taskLists['Programming'].columnOrder[2]].title))
    expect(columnTitle).toBeInTheDocument()
})

it('renders action items', () => {
    render(<Body taskListData={data} activeList={data.activeList} dispatch={() =>{}}/>)
    const actionItemTitle = screen.getByText(new RegExp(data.taskLists['Programming'].tasks['task-1'].title))
    expect(actionItemTitle).toBeInTheDocument()
})

it('renders an Add Task button for each column', () => {
    render(<Body taskListData={data} activeList={data.activeList} dispatch={() =>{}}/>)
    const addTaskButton = screen.getAllByLabelText('Add task button')
    expect(addTaskButton[0]).toBeInTheDocument()
    expect(addTaskButton.length).toBe(3)
})


it('renders the add column button', () => {
    render(<Body taskListData={data} activeList={data.activeList} dispatch={() =>{}}/>)
    const addColumnButton = screen.getByLabelText('Add column button')
    expect(addColumnButton).toBeInTheDocument()
})





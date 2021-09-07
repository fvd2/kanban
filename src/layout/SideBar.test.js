import React from 'react'
import { render, screen } from '@testing-library/react'
import SideBar from './SideBar'
import data from '../data'

it('renders the right number of task lists', () => {
	render(
		<SideBar
			taskLists={data.listOrder}
			activeList={data.activeList}
			onListSwitch={() => {}}
			dispatch={() => {}}
		/>
	)
	const taskListItems = screen.getAllByLabelText('Task list selector')
	expect(taskListItems.length).toBe(2)
})

it('renders the correct task list names', () => {
	render(
		<SideBar
			taskLists={data.listOrder}
			activeList={data.activeList}
			onListSwitch={() => {}}
			dispatch={() => {}}
		/>
	)
	const listOneName = screen.getByText(/Programming/)
	const listTwoName = screen.getByText(/Work/) 
	expect(listOneName).toBeInTheDocument()
	expect(listTwoName).toBeInTheDocument()
})

it('renders the + Add List button', () => {
	render(
		<SideBar
			taskLists={data.listOrder}
			activeList={data.activeList}
			onListSwitch={() => {}}
			dispatch={() => {}}
		/>
	)
	const addListButtonText = screen.getByText(/\+ Add List/)
	expect(addListButtonText).toBeInTheDocument()
})
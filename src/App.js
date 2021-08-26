import { DragDropContext } from 'react-beautiful-dnd'
import Board from './Board'

const App = () => {
	return (
			<DragDropContext>
				<Board />
			</DragDropContext>
	)
}

export default App

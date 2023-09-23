import React from 'react'
import propTypes from 'prop-types'

import './footer.css'
import TasksFilter from './TasksFilter'

const Footer = ({ handleScreenStateChange, screen, todoData, clearCompleted }) => {
  let activeTodos = todoData.filter((todos) => !todos.successful).length
  return (
    <footer className="footer">
      <span className="todo-count">{activeTodos} items left</span>
      <TasksFilter screen={screen} handleScreenStateChange={handleScreenStateChange} />
      <button onClick={() => clearCompleted()} className="clear-completed">
        Clear completed
      </button>
    </footer>
  )
}

Footer.propTypes = {
  handleScreenStateChange: propTypes.func.isRequired,
  screen: propTypes.oneOf(['all', 'active', 'completed']).isRequired,
  todoData: propTypes.arrayOf(
    propTypes.shape({
      createdDate: propTypes.oneOfType([propTypes.instanceOf(Date), propTypes.string]).isRequired,
      label: propTypes.string.isRequired,
      successful: propTypes.bool.isRequired,
      id: propTypes.number.isRequired,
    })
  ).isRequired,
  clearCompleted: propTypes.func.isRequired,
}

Footer.defaultProps = {
  handleScreenStateChange: () => {},
  screen: 'all',
  todoData: [],
  clearCompleted: () => {},
}

export default Footer

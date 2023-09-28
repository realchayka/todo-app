import React from 'react'
import propTypes from 'prop-types'

import './taskList.css'
import Task from './Task'

export default class TasksList extends React.Component {
  render() {
    const { todoData, onDeleted, onSuccessful, screenState, changeItem, startTimer, stopTimer } = this.props

    const activeData = todoData.filter((todo) => !todo.successful)
    const completedData = todoData.filter((todo) => todo.successful)
    return (
      <ul className="todo-list">
        {/* all */}
        {screenState === 'all' &&
          todoData.map((todo) => (
            <Task
              startTimer={startTimer}
              stopTimer={stopTimer}
              changeItem={changeItem}
              key={todo.id}
              onSuccessful={onSuccessful}
              onDeleted={onDeleted}
              {...todo}
            />
          ))}
        {/* active */}
        {screenState === 'active' &&
          activeData.map((todo) => (
            <Task
              startTimer={startTimer}
              stopTimer={stopTimer}
              key={todo.id}
              onSuccessful={onSuccessful}
              onDeleted={onDeleted}
              {...todo}
            />
          ))}
        {/* completed */}
        {screenState === 'completed' &&
          completedData.map((todo) => (
            <Task key={todo.id} onSuccessful={onSuccessful} onDeleted={onDeleted} {...todo} />
          ))}
      </ul>
    )
  }
}

TasksList.propTypes = {
  todoData: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.number.isRequired,
      label: propTypes.string.isRequired,
      successful: propTypes.bool.isRequired,
    })
  ).isRequired,
  onDeleted: propTypes.func.isRequired,
  onSuccessful: propTypes.func.isRequired,
  screenState: propTypes.oneOf(['all', 'active', 'completed']).isRequired,
  changeItem: propTypes.func.isRequired,
}

TasksList.defaultProps = {
  todoData: [],
  onDeleted: () => {},
  onSuccessful: () => {},
  screenState: 'all',
  changeItem: () => {},
}

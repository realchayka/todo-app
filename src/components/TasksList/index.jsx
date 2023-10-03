import React from 'react'
import propTypes from 'prop-types'

import './taskList.css'
import Task from './Task'

function TasksList({
  todoData,
  onDeleted,
  onSuccessful,
  screenState,
  changeItem,
  setTodoData,
  startTimer,
  stopTimer,
  pauseItemHandler,
}) {
  const activeData = todoData.filter((todo) => !todo.successful)
  const completedData = todoData.filter((todo) => todo.successful)
  return (
    <ul className="todo-list">
      {/* all */}
      {screenState === 'all' &&
        todoData.map((todo) => (
          <Task
            pauseItemHandler={pauseItemHandler}
            startTimer={startTimer}
            stopTimer={stopTimer}
            setTodoData={setTodoData}
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
            pauseItemHandler={pauseItemHandler}
            startTimer={startTimer}
            stopTimer={stopTimer}
            setTodoData={setTodoData}
            key={todo.id}
            onSuccessful={onSuccessful}
            onDeleted={onDeleted}
            {...todo}
          />
        ))}
      {/* completed */}
      {screenState === 'completed' &&
        completedData.map((todo) => (
          <Task
            pauseItemHandler={pauseItemHandler}
            startTimer={startTimer}
            stopTimer={stopTimer}
            setTodoData={setTodoData}
            key={todo.id}
            onSuccessful={onSuccessful}
            onDeleted={onDeleted}
            {...todo}
          />
        ))}
    </ul>
  )
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

export default TasksList

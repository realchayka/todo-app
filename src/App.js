import React, { useState, useEffect } from 'react'
import { formatDistanceToNow } from 'date-fns'

import Footer from './components/Footer'
import NewTaskForm from './components/NewTaskForm'
import TasksList from './components/TasksList'

export default function App() {
  const [maxId, setMaxId] = useState(100)
  const [todoData, setTodoData] = useState([])
  const [screen, setScreen] = useState('all')

  const createTodoItem = (label, min, sec) => {
    const createdDate = new Date()
    return {
      createdDate,
      label,
      successful: false,
      id: maxId,
      min,
      sec,
      timerRunning: false,
      created: formatDistanceToNow(createdDate, {
        addSuffix: true,
        includeSeconds: true,
      }),
    }
  }

  const clearCompleted = () => {
    setTodoData((prevTodoData) => {
      const newArr = prevTodoData.filter((todo) => !todo.successful)
      return [...newArr]
    })
  }

  const deleteItem = (id) => {
    setTodoData((prevTodoData) => {
      const idx = prevTodoData.findIndex((el) => el.id === id)
      const before = prevTodoData.slice(0, idx)
      const after = prevTodoData.slice(idx + 1)
      const newArray = [...before, ...after]
      return [...newArray]
    })
  }

  const changeItem = (id, value) => {
    setTodoData((prevTodoData) => {
      const data = [...prevTodoData]
      let idx = data.findIndex((el) => el.id === id)
      data[idx].label = value
      const before = data.slice(0, idx)
      const after = data.slice(idx + 1)
      const newArray = [...before, data[idx], ...after]
      return [...newArray]
    })
  }

  const addItem = (text, min, sec) => {
    const newItem = createTodoItem(text, min, sec)
    setTodoData((prevTodoData) => {
      const newArray = [...prevTodoData, newItem]
      return [...newArray]
    })
    setMaxId((prevState) => prevState + 1)
  }

  const successfulItemHandler = (id) => {
    setTodoData((prevTodoData) => {
      const newArray = [...prevTodoData]
      const idx = prevTodoData.findIndex((el) => el.id === id)
      if (idx !== -1) {
        newArray[idx].successful = !newArray[idx].successful
        newArray[idx].sec = 0
        newArray[idx].min = 0
      }
      return [...newArray]
    })
  }

  const pauseItemHandler = (id, minutes, seconds) => {
    setTodoData((prevTodoData) => {
      const newArray = [...prevTodoData]
      const idx = prevTodoData.findIndex((el) => el.id === id)
      if (idx !== -1) {
        newArray[idx].sec = seconds
        newArray[idx].min = minutes
      }
      return [...newArray]
    })
  }

  const handleScreenStateChange = (newScreen) => {
    setScreen(newScreen)
  }

  useEffect(() => {
    return () => {
      todoData.forEach((task) => {
        if (task.timerRunning) {
          clearInterval(task.intervalId)
        }
      })
    }
  }, [todoData])

  const startTimer = (id) => {
    setTodoData((prevTodoData) => {
      const newArray = prevTodoData.map((task) => {
        if (task.id === id && !task.timerRunning) {
          const intervalId = setInterval(() => {
            if (task.sec > 0) {
              task.sec -= 1
            } else if (task.min > 0) {
              task.sec = 59
              task.min -= 1
            }
          }, 1000)
          return {
            ...task,
            timerRunning: true,
            intervalId,
          }
        }
        return task
      })
      return newArray
    })
  }
  const stopTimer = (id) => {
    setTodoData((prevTodoData) => {
      const newArray = prevTodoData.map((task) => {
        if (task.id === id && task.timerRunning) {
          clearInterval(task.intervalId)
          return {
            ...task,
            timerRunning: false,
          }
        }
        return task
      })
      return newArray
    })
  }

  return (
    <section className="todoapp">
      <NewTaskForm addItem={addItem} />
      <TasksList
        pauseItemHandler={pauseItemHandler}
        setTodoData={setTodoData}
        changeItem={changeItem}
        screenState={screen}
        onSuccessful={successfulItemHandler}
        onDeleted={deleteItem}
        todoData={todoData}
        startTimer={startTimer}
        stopTimer={stopTimer}
      />
      <section className="main">
        <Footer
          clearCompleted={clearCompleted}
          todoData={todoData}
          screen={screen}
          handleScreenStateChange={handleScreenStateChange}
        />
      </section>
    </section>
  )
}

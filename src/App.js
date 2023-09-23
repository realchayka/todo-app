import React from 'react'
import { formatDistanceToNow } from 'date-fns'

import Footer from './components/Footer'
import NewTaskForm from './components/NewTaskForm'
import TasksList from './components/TasksList'

export default class App extends React.Component {
  maxId = 100
  state = {
    todoData: [],
    screen: 'all',
  }

  createTodoItem(label) {
    const createdDate = new Date()
    return {
      createdDate,
      label,
      successful: false,
      id: this.maxId++,
      created: formatDistanceToNow(createdDate, {
        addSuffix: true,
        includeSeconds: true,
      }),
    }
  }

  clearCompleted = () => {
    this.setState(({ todoData }) => {
      const arr = [...todoData]
      const newArr = arr.filter((todo) => todo.successful === false)
      return {
        todoData: newArr,
      }
    })
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)
      const before = todoData.slice(0, idx)
      const after = todoData.slice(idx + 1)
      const newArray = [...before, ...after]
      return {
        todoData: newArray,
      }
    })
  }

  changeItem = (id, value) => {
    this.setState(({ todoData }) => {
      const data = [...todoData]
      let idx = data.findIndex((el) => el.id === id)
      data[idx].label = value
      const before = data.slice(0, idx)
      const after = data.slice(idx + 1)
      const newArray = [...before, data[idx], ...after]
      return {
        todoData: newArray,
      }
    })
  }

  addItem = (text) => {
    const newItem = this.createTodoItem(text)
    this.setState(({ todoData }) => {
      const newArray = [...todoData, newItem]
      return {
        todoData: newArray,
      }
    })
  }

  successfulItemHandler = (id) => {
    this.setState(({ todoData }) => {
      const newArray = [...todoData]
      const idx = todoData.findIndex((el) => el.id === id)
      if (idx !== -1) {
        newArray[idx].successful = !newArray[idx].successful
      }
      return {
        todoData: newArray,
      }
    })
  }

  handleScreenStateChange = (newScreen) => {
    this.setState({ screen: newScreen })
  }

  render() {
    const { screen, todoData } = this.state
    return (
      <section className="todoapp">
        <NewTaskForm addItem={this.addItem} />
        <TasksList
          changeItem={this.changeItem}
          screenState={screen}
          onSuccessful={this.successfulItemHandler}
          onDeleted={this.deleteItem}
          todoData={this.state.todoData}
        />
        <section className="main">
          <Footer
            clearCompleted={this.clearCompleted}
            todoData={todoData}
            screen={screen}
            handleScreenStateChange={this.handleScreenStateChange}
          />
        </section>
      </section>
    )
  }
}

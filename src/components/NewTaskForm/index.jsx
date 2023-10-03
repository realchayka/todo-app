import React, { useState } from 'react'
import propTypes from 'prop-types'
import './newTaskForm.css'

function NewTaskForm({ addItem }) {
  const [state, setState] = useState({
    label: '',
    minutes: '',
    seconds: '',
  })

  const handleKeyUp = (event) => {
    const { label, minutes, seconds } = state
    event.preventDefault()

    if (label === '') {
      return
    } else if (event.code === 'Enter') {
      if (isNaN(minutes) || isNaN(seconds)) {
        setState({ label: '', minutes: '', seconds: '' })
      } else {
        addItem(label, Number(minutes), Number(seconds))
        setState({
          label: '',
          minutes: '',
          seconds: '',
        })
      }
    }
  }

  const onLabelChange = (e) => {
    setState({
      ...state,
      label: e.target.value,
    })
  }

  const onMinChange = (e) => {
    if (e.target.value > 60 || e.target.value < 0) {
      return
    }
    setState({
      ...state,
      minutes: e.target.value,
    })
  }

  const onSecondChange = (e) => {
    if (e.target.value > 60 || e.target.value < 0) {
      return
    }
    setState({
      ...state,
      seconds: e.target.value,
    })
  }
  const { label, minutes, seconds } = state
  return (
    <header className="header">
      <h1>todos</h1>
      <form className="new-todo-form">
        <input
          onKeyUp={handleKeyUp}
          onChange={onLabelChange}
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus=""
          value={label}
        />
        <input
          value={minutes}
          onKeyUp={handleKeyUp}
          onChange={onMinChange}
          className="new-todo-form__timer"
          placeholder="Min"
          autoFocus=""
        />
        <input
          value={seconds}
          onKeyUp={handleKeyUp}
          onChange={onSecondChange}
          className="new-todo-form__timer"
          placeholder="Sec"
          autoFocus=""
        />
      </form>
    </header>
  )
}

NewTaskForm.propTypes = {
  addItem: propTypes.func.isRequired,
}

NewTaskForm.defaultProps = {
  addItem: () => {},
}

export default NewTaskForm

import React from 'react'
import propTypes from 'prop-types'
import './newTaskForm.css'

export default class NewTaskForm extends React.Component {
  state = {
    label: '',
  }

  handleKeyUp = (event) => {
    event.preventDefault()
    if (this.state.label === '') {
      return
    } else if (event.code === 'Enter') {
      this.props.addItem(this.state.label)
      this.setState({
        label: '',
      })
    }
  }

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    })
  }

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <input
          onKeyUp={this.handleKeyUp}
          onChange={this.onLabelChange}
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus=""
          value={this.state.label}
        />
      </header>
    )
  }
}

NewTaskForm.propTypes = {
  addItem: propTypes.func.isRequired,
}

NewTaskForm.defaultProps = {
  addItem: () => {},
}

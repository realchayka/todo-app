import React from 'react'
import { formatDistanceToNow } from 'date-fns'
import './task.css'
import propTypes from 'prop-types'

export default class Task extends React.Component {
  state = {
    edit: false,
    value: '',
  }
  handlePlayClick = () => {
    this.props.startTimer(this.props.id)
  }

  handlePauseClick = () => {
    this.props.stopTimer(this.props.id)
  }

  handleEditTrue = () => {
    this.setState({ edit: true })
  }

  handleKeyUp = (event) => {
    event.preventDefault()
    if (this.state.value === '') {
      return
    } else if (event.code === 'Enter') {
      this.props.changeItem(this.props.id, this.state.value)
      this.setState({
        label: '',
        edit: false,
      })
    }
  }

  onLabelChange = (e) => {
    this.setState({
      value: e.target.value,
    })
  }

  render() {
    const { edit } = this.state
    const { label, successful, onDeleted, onSuccessful, id, createdDate, min, sec } = this.props

    const timeDifference = formatDistanceToNow(createdDate, {
      addSuffix: true,
      includeSeconds: true,
    })

    let classNames = ''
    if (successful) {
      classNames += ' completed'
    }
    if (edit) {
      classNames += ' editing'
    }

    return (
      <li className={classNames}>
        <div className="view">
          <input id={`checkbox-${id}`} className="toggle" type="checkbox" defaultChecked={successful} />
          <label>
            <label htmlFor={`checkbox-${id}`} onClick={() => onSuccessful(id)} className="title">
              {label}
            </label>
            <span className="description">
              <button onClick={this.handlePlayClick} className="icon icon-play"></button>
              <button onClick={this.handlePauseClick} className="icon icon-pause"></button>
              {min}:{sec}
            </span>
            <span className="description">{timeDifference}</span>
          </label>
          <button onClick={this.handleEditTrue} className="icon icon-edit"></button>
          <button onClick={() => onDeleted(id)} className="icon icon-destroy"></button>
        </div>
        {edit && (
          <input
            onKeyUp={this.handleKeyUp}
            onChange={this.onLabelChange}
            type="text"
            className="edit"
            placeholder="Edit..."
          />
        )}
      </li>
    )
  }
}

Task.propTypes = {
  changeItem: propTypes.func.isRequired,
  onSuccessful: propTypes.func.isRequired,
  onDeleted: propTypes.func.isRequired,
  label: propTypes.string.isRequired,
  id: propTypes.number.isRequired,
  successful: propTypes.bool.isRequired,
  created: propTypes.string.isRequired,
  createdDate: propTypes.instanceOf(Date).isRequired,
}

Task.defaultProps = {
  changeItem: () => {},
  onSuccessful: () => {},
  onDeleted: () => {},
  label: '',
  id: 0,
  successful: false,
  created: '',
  createdDate: new Date(),
}

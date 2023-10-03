import React, { useState, useEffect } from 'react'
import { formatDistanceToNow } from 'date-fns'
import './task.css'
import propTypes from 'prop-types'

function Task({
  label,
  successful,
  onDeleted,
  onSuccessful,
  id,
  createdDate,
  changeItem,
  min,
  sec,
  timerRunning,
  startTimer,
  stopTimer,
  pauseItemHandler,
}) {
  const [edit, setEdit] = useState(false)
  const [value, setValue] = useState('')
  const [minutes, setMinutes] = useState(min)
  const [seconds, setSeconds] = useState(sec)

  const handlePlayStart = () => {
    startTimer(id)
  }

  const handleOnPause = () => {
    pauseItemHandler(id, minutes, seconds)
    stopTimer(id)
  }

  const handleEditTrue = () => {
    setEdit(true)
  }

  useEffect(() => {
    setMinutes(min), setSeconds(sec)
  }, [min, sec])

  useEffect(() => {
    let interval

    if (timerRunning && minutes > 0 && seconds >= 0) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds((prevState) => prevState - 1)
        }
        if (minutes > 0 && seconds === 0) {
          setMinutes((prevState) => prevState - 1)
          setSeconds(59)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [timerRunning, minutes, seconds])

  const handleKeyUp = (event) => {
    event.preventDefault()
    if (value === '') {
      return
    } else if (event.code === 'Enter') {
      changeItem(id, value)
      setEdit(false)
    }
  }

  const onLabelChange = (e) => {
    setValue(e.target.value)
  }

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
        <input
          id={`checkbox-${id}`}
          className="toggle"
          type="checkbox"
          checked={successful}
          defaultValue={successful}
          readOnly
        />
        <label>
          <label htmlFor={`checkbox-${id}`} onClick={() => onSuccessful(id)} className="title">
            {label}
          </label>
          <span className="description">
            <button onClick={handlePlayStart} className="icon icon-play"></button>
            <button onClick={handleOnPause} className="icon icon-pause"></button>
            {minutes}:{seconds}
          </span>
          <span className="description">{timeDifference}</span>
        </label>
        <button onClick={handleEditTrue} className="icon icon-edit"></button>
        <button onClick={() => onDeleted(id)} className="icon icon-destroy"></button>
      </div>
      {edit && (
        <input onKeyUp={handleKeyUp} onChange={onLabelChange} type="text" className="edit" placeholder="Edit..." />
      )}
    </li>
  )
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
  timerRunning: propTypes.bool.isRequired,
  startTimer: propTypes.func.isRequired,
  stopTimer: propTypes.func.isRequired,
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

export default Task

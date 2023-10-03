import React from 'react'
import './tasksFilter.css'
import propTypes from 'prop-types'

export default class TasksFilter extends React.Component {
  render() {
    const { handleScreenStateChange, screen } = this.props
    return (
      <ul className="filters">
        <li>
          <button className={screen === 'all' ? 'selected' : ''} onClick={() => handleScreenStateChange('all')}>
            All
          </button>
        </li>
        <li>
          <button className={screen === 'active' ? 'selected' : ''} onClick={() => handleScreenStateChange('active')}>
            Active
          </button>
        </li>
        <li>
          <button
            className={screen === 'completed' ? 'selected' : ''}
            onClick={() => handleScreenStateChange('completed')}
          >
            Completed
          </button>
        </li>
      </ul>
    )
  }
}

TasksFilter.propTypes = {
  handleScreenStateChange: propTypes.func.isRequired,
  screen: propTypes.oneOf(['all', 'active', 'completed']).isRequired,
}

TasksFilter.defaultProps = {
  handleScreenStateChange: () => {},
  screen: 'all',
}

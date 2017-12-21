import * as React from 'react'
import { map } from 'lodash'
import PropTypes from 'prop-types'

export const ToolbarButton = ({ onClick, isDisabled, isCurrent, value, text }) => (
  <button
    key={value}
    className={`btn ${isCurrent ? 'current' : ''}`}
    onClick={onClick}
    disabled={isDisabled}
    value={value}
  >
    {text}
  </button>
)

ToolbarButton.propTypes = {
  onClick: PropTypes.func,
  isCurrent: PropTypes.bool,
  isDisabled: PropTypes.bool,
  value: PropTypes.string,
  text: PropTypes.string
}
ToolbarButton.defaultProps = {
  onClick: () => { console.log('... onClick triggered') }, //eslint-disable-line
  isCurrent: false,
  isDisabled: false,
  value: null,
  text: 'Button',
}

export const Toolbar = ({ currentValue, onSizeChange, onAlignmentChange }) => {

  const sizeButtons = [
    {
      onClick: onSizeChange,
      value: 'small',
      text: 'Small',
      isCurrent: currentValue.size === 'small'
    },
    {
      onClick: onSizeChange,
      value: 'medium',
      text: 'Medium',
      isCurrent: currentValue.size === 'medium'
    },
    {
      onClick: onSizeChange,
      value: 'full-width',
      text: 'Full-Width',
      isCurrent: currentValue.size === 'full-width'
    }
  ]

  const alignmentButtons = [
    {
      onClick: onAlignmentChange,
      value: 'left',
      text: 'Left',
      isDisabled: currentValue.size === 'full-width',
      isCurrent: currentValue.alignment === 'left'
    },
    {
      onClick: onAlignmentChange,
      value: 'center',
      text: 'Center',
      isDisabled: currentValue.size === 'full-width',
      isCurrent: currentValue.alignment === 'center'
    },
    {
      onClick: onAlignmentChange,
      value: 'right',
      text: 'Right',
      isDisabled: currentValue.size === 'full-width',
      isCurrent: currentValue.alignment === 'right'
    },
  ]

  return (
    <div>
      {map(sizeButtons, ToolbarButton)}
      {map(alignmentButtons, ToolbarButton)}
    </div>
  )
}

Toolbar.propTypes = {
  currentValue: PropTypes.objectOf(PropTypes.string),
  onSizeChange: PropTypes.func,
  onAlignmentChange: PropTypes.func
}

Toolbar.defaultProps = {
  currentValue: {},
  onSizeChange: () => { console.log('... onSizeChange triggered') }, //eslint-disable-line
  onAlignmentChange: () => { console.log('... onSizeChange triggered') } //eslint-disable-line
}

import * as React from 'react'
import { map } from 'lodash'
import PropTypes from 'prop-types'

const ToolbarButton = ({ onClick, isDisabled, isCurrent, value, text }) => (
  <button key={value} className={`btn ${isCurrent ? 'current' : ''}`} onClick={onClick} disabled={isDisabled} value={value}>{text}</button>
)

ToolbarButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  isCurrent: PropTypes.string.isRequired,
  isDisabled: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
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
  currentValue: PropTypes.objectOf(PropTypes.string).isRequired,
  onSizeChange: PropTypes.func.isRequired,
  onAlignmentChange: PropTypes.func.isRequired
}

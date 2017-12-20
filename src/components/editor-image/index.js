import * as React from 'react'
import PropTypes from 'prop-types'

// Helpers
import { get, map } from 'lodash'
import { BemHelper } from '../../helpers/bem-helper'

// Styling
const classes = new BemHelper('editor-image')

const ToolbarButton = ({ onClick, value, text }) => (
  <button onClick={onClick} value={value}>{text}</button>
)

ToolbarButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
}

export class EditorImage extends React.Component {

  onChange(diff) {
    const change = {
      data: {
        ...this.props.block.data,
        ...diff
      }
    }
    this.props.onChange(change)
  }

  onCaptionChange = (event) => {
    const value = get(event, 'target.value', '')
    this.onChange({
      caption: value
    })
  }

  onSizeChange = (event) => {
    const value = get(event, 'target.value', '')
    this.onChange({
      size: value
    })
  }

  onAlignmentChange = (event) => {
    const value = get(event, 'target.value', '')
    this.onChange({
      alignment: value
    })
  }

  render() {
    const { block } = this.props
    const currentValue = get(block, 'data', '')
    const sizeButtons = [
      {
        onClick: this.onSizeChange,
        value: 'small',
        text: 'Small',
      },
      {
        onClick: this.onSizeChange,
        value: 'medium',
        text: 'Medium'
      },
      {
        onClick: this.onSizeChange,
        value: 'full-width',
        text: 'Full-Width'
      }
    ]

    const alignmentButtons = [
      {
        onClick: this.onAlignmentChange,
        value: 'left',
        text: 'Left',
      },
      {
        onClick: this.onAlignmentChange,
        value: 'center',
        text: 'Center'
      },
      {
        onClick: this.onAlignmentChange,
        value: 'right',
        text: 'Right'
      },
    ]

    return (
      <div {...classes('container')} >
        <div {...classes('toolbar')}>
          {map(sizeButtons, ToolbarButton)}
          {map(alignmentButtons, ToolbarButton)}
        </div>
        <div {...classes('image-container', currentValue.alignment)}>
          <img {...classes('image', currentValue.size)} src={currentValue.src || ''} alt={currentValue.caption || ''} />
        </div>
        <input onChange={this.onCaptionChange} value={currentValue.caption} />
      </div>
    )
  }

}

EditorImage.propTypes = {
  block: PropTypes.shape({
    id: PropTypes.number.isRequired,
    data: PropTypes.objectOf(PropTypes.string).isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired
}

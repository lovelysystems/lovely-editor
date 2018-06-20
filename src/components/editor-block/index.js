import * as React from 'react'
import PropTypes from 'prop-types'

// Helpers
import { get } from 'lodash'
import { BemHelper } from '../../helpers/bem-helper'

// Styling
const classes = new BemHelper('editor-block')

export class EditorBlock extends React.Component {

  onRemove = (action) => {
    const blockId = get(this.props, 'block.id')
    this.props.onAction({
      action: 'remove',
      id: blockId,
    })
  }

  render() {
    const { block, children, style } = this.props
    const title = get(block, 'meta.title', 'Untitled')

    return (
      <div {...classes('container')} style={style}>
        <div {...classes('header')}>
          <div {...classes('title')}>{title}</div>
          <div {...classes('actions')}>
            <button {...classes('action-remove')} onClick={this.onRemove}>Delete</button>
          </div>
        </div>
        <div {...classes('content')}>
          {children}
        </div>
      </div>
    )
  }

}

EditorBlock.propTypes = {
  additionalProps: PropTypes.object,
  block: PropTypes.shape({
    id: PropTypes.number.isRequired,
    meta: PropTypes.objectOf(PropTypes.string).isRequired,
  }).isRequired,
  blockConfig: PropTypes.object,
  children: PropTypes.element.isRequired,
  onAction: PropTypes.func.isRequired,
  style: PropTypes.object
}

EditorBlock.defaultProps = {
  additionalProps: {},
  blockConfig: {},
  style: {}
}

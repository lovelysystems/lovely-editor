import * as React from 'react'
import PropTypes from 'prop-types'

// Material-UI
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
// import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'

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
    const { block, children } = this.props
    const title = get(block, 'meta.title', 'Untitled')

    return (
      <Card
        className={classes.card}
        style={{
          margin: '0px 0px 10px 0px'
        }}
      >
        <CardContent>
          <div {...classes('header')}>
            <Typography variant="title" gutterBottom>
              {title}
            </Typography>
            <div {...classes('actions')}>
              <Button
                variant="contained"
                size="small"
                color="secondary"
                className={classes.button}
                onClick={this.onRemove}
              >
                  Delete
              </Button>
            </div>
          </div>
          <div {...classes('content')}>
            {children}
          </div>
        </CardContent>
      </Card>
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

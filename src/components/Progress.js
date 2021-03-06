import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'

const styles = {
  root: {
    flexGrow: 1
  }
}

export default withStyles(styles)(function Progress(props) {
  return <LinearProgress />
})

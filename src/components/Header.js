import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  title: {
    paddingLeft: theme.spacing.unit * 2
  }
})

export default withStyles(styles)(({ classes }) => (
  <AppBar position="static" color="primary">
    <Toolbar>
      <Typography className={classes.title} variant="headline" color="inherit">
        Tinkoff News
      </Typography>
    </Toolbar>
  </AppBar>
))

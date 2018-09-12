import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import formatDate from '../utils/formatDate'

const styles = theme => ({
  root: {
    textDecoration: 'none'
  },
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 4,
    paddingBottom: theme.spacing.unit * 4,
    margin: theme.spacing.unit * 2,
    cursor: 'pointer'
  },
  title: {
    verticalAlign: 'middle',
    display: 'inline-block'
  },
  date: {
    display: 'inline-block',
    float: 'right',
    color: '#bdbdbd',
    verticalAlign: 'middle'
  },
  before: {
    content: '',
    height: '100%',
    verticalAlign: 'middle'
  }
})

function FeedItem({ classes, text, id, timestamp }) {
  return (
    <Link to={`/post/${id}`} className={classes.root}>
      <Paper className={classes.paper} elevation={1}>
        <div className={classes.before} />
        <Typography className={classes.title} component="p">
          {text}
        </Typography>
        <Typography className={classes.date}>
          {formatDate(timestamp)}{' '}
        </Typography>
      </Paper>
    </Link>
  )
}

FeedItem.propTypes = {
  classes: PropTypes.object.isRequired,
  timestamp: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
}

export default withStyles(styles)(FeedItem)

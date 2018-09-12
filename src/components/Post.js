import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { inject, observer } from 'mobx-react'
import Progress from './Progress'
import BackIcon from './BackIcon'

const SWIPE_TRESHOLD = 10

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    margin: theme.spacing.unit * 2
  },
  backButton: {
    marginLeft: theme.spacing.unit * 5,
    marginTop: theme.spacing.unit * 2,
    cursor: 'pointer',
    color: '#757575'
  }
})

@inject('newsStore')
@observer
class Post extends React.Component {
  touchStartX = null

  componentDidMount() {
    this.props.newsStore.loadPost(this.props.match.params.id)
  }

  componentWillUnmount() {
    if (typeof this.stopListenSwipe === 'function') {
      this.stopListenSwipe()
    }
  }

  componentDidUpdate(prevProps) {
    if (!this.props.newsStore.isLoading && !this.stopListenSwipe) {
      const appNode = document.querySelector('#app')

      appNode.addEventListener('touchstart', this.handleTouchStart)
      appNode.addEventListener('touchmove', this.handleTouchMove)
      appNode.addEventListener('touchend', this.handleTouchEnd)

      this.stopListenSwipe = () => {
        appNode.removeEventListener('touchstart', this.handleTouchStart)
        appNode.removeEventListener('touchmove', this.handleTouchMove)
        appNode.removeEventListener('touchend', this.handleTouchEnd)
      }
    }
  }

  handleTouchStart = event => {
    try {
      this.touchStartX = event.touches[0].clientX
    } catch (error) {}
  }

  handleTouchMove = event => {
    this.lastTouchMoveEvent = event
  }

  handleTouchEnd = event => {
    try {
      if (
        Math.abs(
          this.touchStartX - this.lastTouchMoveEvent.touches[0].clientX
        ) > SWIPE_TRESHOLD
      ) {
        this.goBack()
      }
    } catch (error) {}

    this.lastTouchMoveEvent = null
    this.touchStartX = null
  }

  handleBackClick = () => {
    this.goBack()
  }

  goBack() {
    this.props.history.goBack()
  }

  render() {
    const { newsStore } = this.props
    const post = newsStore.posts[this.props.match.params.id]

    if (newsStore.isLoading || !post) {
      return <Progress />
    }

    const { classes } = this.props

    return (
      <>
        <Typography
          onClick={this.handleBackClick}
          className={classes.backButton}
          gutterBottom
        >
          <BackIcon />
          Назад
        </Typography>
        <Paper className={classes.root} elevation={1}>
          <Typography
            component="p"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </Paper>
      </>
    )
  }
}

export default withStyles(styles)(Post)

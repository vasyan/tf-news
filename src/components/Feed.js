import React from 'react'
import { inject, observer } from 'mobx-react'
import throttle from '../utils/throttle'
import Progress from './Progress'
import FeedItem from './FeedItem'
import ScrollSaver from '../services/scrollSaver'

@inject('newsStore')
@observer
export default class Feed extends React.Component {
  componentDidMount() {
    const { newsStore } = this.props

    if (!newsStore.news.length) {
      this.props.newsStore.loadNews().then(() => {
        this.checkLoadNext()
      })
    }
    document.addEventListener('scroll', this.handleScroll)
    ScrollSaver.restore()
  }

  componentWillUnmount() {
    this.stopListenScroll()
    ScrollSaver.save() // firefox better experience
  }

  stopListenScroll() {
    document.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = throttle(event => {
    this.checkLoadNext()
  }, 1000)

  checkLoadNext() {
    const isOverheight = window.innerHeight > document.body.offsetHeight
    const isOnTheBottom =
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 200

    if ((isOnTheBottom || isOverheight) && this.props.newsStore.hasMore) {
      this.props.newsStore.loadNext()
    }
  }

  render() {
    const { isLoading, isLoadingNext, news } = this.props.newsStore

    if ((isLoading && !isLoadingNext) || !news) {
      return <Progress />
    }

    return (
      <>
        {news.map(post => {
          return (
            <FeedItem
              id={post.id}
              text={post.text}
              timestamp={post.publicationDate.milliseconds}
              onClick={this.handleItemClick.bind(this, post.id)}
              key={post.id}
            />
          )
        })}
        {isLoadingNext ? <Progress /> : null}
      </>
    )
  }

  handleItemClick(id) {
    this.props.newsStore.loadPost(id)
  }
}

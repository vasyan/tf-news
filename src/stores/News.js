import { observable, action, computed } from 'mobx'
import DomPurify from 'dompurify'
import api from '../api'

const LIMIT = 20

function normalizePost(post) {
  return { ...post, content: DomPurify.sanitize(post.content) }
}

class NewsStore {
  @observable
  isLoading = true

  @observable
  isLoadingNext = false

  @observable
  page = 0

  @observable
  totalPagesCount = 0

  @observable
  hasMore = false

  @observable
  newsCollection = []

  @observable
  postsRegistry = {}

  @observable
  predicate = {}

  @computed
  get news() {
    return this.newsCollection
  }

  @computed
  get posts() {
    return this.postsRegistry
  }

  @action
  loadNews() {
    this.isLoading = true
    return api.news
      .all(this.page, LIMIT)
      .then(
        action(({ payload, ...props }) => {
          this.newsCollection = this.newsCollection.concat(payload)
          this.hasMore = payload.length === LIMIT
        })
      )
      .finally(
        action(() => {
          this.isLoading = false
        })
      )
  }

  @action
  loadNext() {
    this.isLoadingNext = true
    this.page++
    this.loadNews()
  }

  @action
  loadPost(id) {
    this.isLoading = true

    return api.news
      .byId(id)
      .then(
        action(({ payload }) => {
          this.postsRegistry[id] = normalizePost(payload)
          return this.postsRegistry[id]
        })
      )
      .finally(
        action(() => {
          this.isLoading = false
        })
      )
  }
}

export default new NewsStore()

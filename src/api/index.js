import axios from 'axios'

const API_ROOT = 'https://api.tinkoff.ru/v1'

const cache = {}

const handleErrors = err => {
  if (err && err.response && err.response.status === 401) {
    authStore.logout()
  }
  return err
}

const requests = {
  get: url => {
    if (cache[url]) {
      return Promise.resolve(cache[url])
    } else {
      return axios
        .get(`${API_ROOT}${url}`)
        .then(res => {
          cache[url] = res.data
          return res.data
        })
        .catch(handleErrors)
    }
  }
}

const getLimit = (count, p) => `first=${p * count}&last=${p * count + count}`

const news = {
  all: (page, limit = 10) => requests.get(`/news?${getLimit(limit, page)}`),
  byId: id => requests.get(`/news_content?id=${id}`)
}

export default {
  news
}

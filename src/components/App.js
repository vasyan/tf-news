import { Switch, Route, withRouter } from 'react-router-dom'
import Header from './Header'
import Feed from './Feed'
import Post from './Post'

export default withRouter(function() {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/post/:id" component={Post} />
        <Route path="/" component={Feed} />
      </Switch>
    </>
  )
})

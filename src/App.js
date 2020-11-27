import React, { useEffect } from 'react'
import './App.css'
import { monitorAuthState } from './redux/actions/userActions'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Feed from './pages/Feed'
import CreatePost from './pages/CreatePost'
import SignIn from './pages/Signin'
import Profile from './pages/Profile'
import Activity from './pages/Activity'
import PostPage from './pages/PostPage'
import { getLikes } from './redux/actions/likeActions'
import { getComments } from './redux/actions/CommentActions'
import { getPosts } from './redux/actions/postActions'
import Chat from './pages/Chat'
import AuthGuard from './components/AuthGuard'
function App(props) {
  const { user } = props

  useEffect(() => {
    props.monitorAuthState()
  }, [])
  useEffect(() => {
    props.getComments()
  }, [])

  useEffect(() => {
    props.getPosts()
  }, [])
  useEffect(() => {
    props.getLikes()
  }, [])


  return (
    <div className="app">
      <Router>
        <Switch>
          <AuthGuard exact path='/' component={SignIn} />
          <AuthGuard exact path='/feed' component={Feed} />
          <AuthGuard exact path='/create/post' component={CreatePost} />
          <AuthGuard exact path='/profile/:userId' component={Profile} />
          <AuthGuard exact path='/activity' component={Activity} />
          <AuthGuard exact path='/chats/:username' component={Chat} />
          <AuthGuard exact path='/post/:id' component={PostPage} />
        </Switch>
      </Router >
    </div >
  );
}

const mapStateToProps = (state) => {
  return {
    savedPosts: state.post,
    user: state.user.user,


  }
}
export default connect(mapStateToProps, { monitorAuthState, getLikes, getComments, getPosts })(App)

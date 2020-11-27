import { combineReducers } from 'redux'
import postReducer from './postsReducer'
import userReducer from './userReducer'
const reducer = combineReducers({
    post: postReducer,
    user: userReducer
})

export default reducer
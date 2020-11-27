import { GET_POSTS, SET_PROGRESS, GET_COMMENTS, GET_POST, GET__ROOM_MESSAGES, GET_SAVED_POSTS } from '../actions/types'
const initialState = {
    posts: [],
    progress: 0,
    comments: [],
    post: null,
    messages: [],
    savedPosts: [],
    loading: true
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_POSTS:
            return {
                ...state,
                posts: action.payload
            }
        case SET_PROGRESS:
            return {
                ...state,
                progress: action.payload
            }
        case GET_COMMENTS:
            return {
                ...state,
                comments: action.payload
            }
        case GET_POST:
            return {
                ...state,
                post: action.payload
            }
        case GET__ROOM_MESSAGES:
            return {
                ...state,
                loading: false,
                messages: action.payload
            }
        case GET_SAVED_POSTS:
            return {
                ...state,
                savedPosts: action.payload
            }
        default:
            return state
    }
}


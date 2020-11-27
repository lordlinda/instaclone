import { SET_USER, SET_USER_PROFILE, GET_LIKES, GET_NOTIFICATIONS, GET_FOLLOWING, FOLLOW_USER, UNFOLLOW_USER, UNLIKE_POST, LOGOUT } from '../actions/types'

const initialState = {
    user: {},
    profile: null,
    likes: [],
    notifications: [],
    following: [],
    authenticated: true,
    loading: true
}
export default (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.payload,
                authenticated: true,
                loading: false
            }
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.payload
            }
        case GET_LIKES:
            return {
                ...state,
                likes: action.payload
            }
        case GET_NOTIFICATIONS:
            return {
                ...state,
                notifications: action.payload
            }
        case GET_FOLLOWING:
            return {
                ...state,
                following: action.payload
            }

        case UNFOLLOW_USER:
            let index = state.following.findIndex(following => following.user === action.payload)
            state.following.splice(index, 1)
            return {
                ...state
            }
        case UNLIKE_POST:
            return {
                ...state,
                likes: state.likes.filter(
                    (like) => like.postId !== action.payload.postId
                )
            }
        case LOGOUT:
            return {
                ...state,
                authenticated: false
            }
        default:
            return state
    }
}
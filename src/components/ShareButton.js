import { IconButton } from '@material-ui/core'
import React from 'react'
import { connect } from 'react-redux'
import TurnedInNotSharpIcon from '@material-ui/icons/TurnedInNotSharp';
import TurnedInIcon from '@material-ui/icons/TurnedIn';
import { likePost, unlikePost } from '../redux/actions/likeActions'
import './likedButton.css'
export const likeButton = (props) => {
    const { user } = props
    const likePost = () => {
        const like = {
            postId: props.id,
            userId: user.uid
        }
        props.likePost(like)
    }
    const unlikePost = () => {
        const like = {
            postId: props.id,
            userId: user.uid
        }

        props.unlikePost(like)
    }
    const isPostLiked = () => {
        if (props.likes.length > 0) {
            if (props.likes.filter(like => like.userId === user.uid).find(like => like.postId === props.id)) {
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    }
    return (
        <div>
            {
                isPostLiked() ?
                    (
                        <IconButton onClick={unlikePost}>
                            <FavoriteIcon className='likedScream' />
                        </IconButton>
                    ) : (
                        <IconButton onClick={likePost} >
                            <FavoriteBorderIcon />
                        </IconButton>

                    )
            }


        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.user.user,
    likes: state.user.likes
})


export default connect(mapStateToProps, { likePost, unlikePost })(likeButton)

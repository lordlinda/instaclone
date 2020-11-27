import { IconButton } from '@material-ui/core'
import React from 'react'
import { connect } from 'react-redux'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { likePost, unlikePost } from '../redux/actions/likeActions'
import './likedButton.css'
export const likeButton = (props) => {
    const { user } = props
    const likePost = () => {
        const like = {
            postId: props.id,
            userId: user.displayName
        }
        props.likePost(like)
    }
    const unlikePost = () => {
        const like = {
            postId: props.id,
            userId: user.displayName
        }

        props.unlikePost(like)
    }
    const isLikedPost = () => {
        if (props.likes.filter(like => like.userId === user.displayName).find(like => like.postId === props.id)) {
            return true
        } else {
            return false
        }

    }

    return (
        <div>
            {
                isLikedPost() ?
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

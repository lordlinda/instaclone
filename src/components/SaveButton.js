import React, { Component } from 'react'
import { connect } from 'react-redux'
import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import { savePost, unsavePost } from '../redux/actions/SavedActions'
import { IconButton } from '@material-ui/core';
const SaveButton = (props) => {
    console.log(props.savedPosts);
    const { user } = props
    const isSavedPost = () => {
        if (props.savedPosts.length > 0) {
            if (props.savedPosts.filter(post => post.userId === user.displayName).find(post => post.id === props.id)) {
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    }

    const savePost = () => {
        const post = {
            postId: props.id,
            userId: user.displayName
        }
        props.savePost(post)
    }
    const unsavePost = () => {
        const post = {
            postId: props.id,
            userId: user.displayName
        }
        props.unsavePost(post)
    }


    return (
        <div>
            {
                isSavedPost() ?
                    (
                        <IconButton onClick={unsavePost}>
                            <BookmarkIcon />
                        </IconButton>
                    ) : (
                        <IconButton onClick={savePost} >
                            <BookmarkBorderIcon />
                        </IconButton>

                    )
            }
        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.user.user,
    savedPosts: state.post.savedPosts
})



export default connect(mapStateToProps, { savePost, unsavePost })(SaveButton)

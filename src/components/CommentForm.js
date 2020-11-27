import React, { useState } from 'react'
import { connect } from 'react-redux'
import { createComment } from '../redux/actions/CommentActions'

export const CommentForm = (props) => {
    const { user } = props

    const [comment, setComment] = useState('')
    const postComment = (e) => {
        e.preventDefault()
        const data = {
            message: comment,
            username: user.displayName,
            postId: props.id,
            userId: user.uid
        }
        props.createComment(data)
        setComment('')
    }
    return (
        <div>

            <form className='post__form'>
                <input
                    className='post__input'
                    type='text'
                    placeholder='Add a comment...'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)} />

                <button
                    className='post__button'
                    type='submit'
                    onClick={postComment}
                >Post</button>
            </form>


        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.user.user
})



export default connect(mapStateToProps, { createComment })(CommentForm)

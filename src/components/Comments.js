import React, { useState, useEffect } from 'react'
import './Comments.css'
import CommentForm from './CommentForm'
export const Comments = (props) => {
    const [comments, setComments] = useState([])

    useEffect(() => {
        setComments(props.comments.filter(comment => comment.postId === props.id))
    }, [props.comments.length, comments.length])

    return (
        <div className='comments'>
            {
                comments.map(comment => (
                    <div className='comments__posts'
                        key={comment.id}>
                        <div className='comment__username'>{comment.username}</div>
                        <p>{comment.message}</p>
                    </div>
                ))
            }
            <CommentForm id={props.id} />

        </div>
    )
}





export default Comments

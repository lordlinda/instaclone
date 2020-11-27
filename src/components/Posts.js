import React, { useEffect } from 'react'
import Post from './Post'

const Posts = (props) => {

    return (
        <div>
            {
                props.posts.length > 0 ?
                    props.posts.map(post => {
                        return <Post key={post.id} post={post} />
                    })
                    : null
            }
        </div>
    )
}





export default Posts

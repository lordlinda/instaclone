import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Post from '../components/Post'
import { getPost } from '../redux/actions/postActions'
import { getComments } from '../redux/actions/CommentActions'
export const PostPage = (props) => {
    const { post } = props
    useEffect(() => {
        props.getPost(props.match.params.id)
        props.getComments()
    }, [props.match.params.id])
    return (
        <div>
            {
                post ?
                    <Post post={post} />
                    : null
            }

        </div>
    )
}

const mapStateToProps = (state) => ({
    post: state.post.post
})


export default connect(mapStateToProps, { getPost, getComments })(PostPage)

import { Avatar, IconButton } from '@material-ui/core'
import React from 'react'
import './Post.css'
import TelegramIcon from '@material-ui/icons/Telegram'
import { connect } from 'react-redux'
import { Comments } from './Comments'
import LikeButton from './LikeButton'
import { Link } from 'react-router-dom'
import SaveButton from './SaveButton'
function Post(props) {
    const { imageUrl, caption, username, id, likeCount, commentCount, userId } = props.post
    return (
        <div className='post'>
            {/**header */}
            <div className='post__header'>
                <Avatar
                    className='post__avatar'
                    alt={username}
                />
                <Link to={`/profile/${userId}`}>{username}</Link>
            </div>

            {/**image */}
            <img
                className='post__image'
                src={imageUrl}
                alt='' />
            <div className='post__middle'>
                <div className='post__left'>
                    <LikeButton id={id} />
                    {
                        props.user?.displayName !== username && (
                            <IconButton>
                                <Link to={`chats/${username}`}>
                                    <TelegramIcon />
                                </Link>
                            </IconButton>
                        )
                    }

                </div>
                <div>
                    <SaveButton id={id} />
                </div>
            </div>

            <div className='post__bottom'>
                <div>{`${likeCount} likes`}</div>
                {/**username and caption */}
                <div className='post__caption'>
                    <p>{username}</p> {caption}</div>

                <Comments id={id} comments={props.comments} />
            </div>

        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        comments: state.post.comments,
        user: state.user.user
    }
}
export default connect(mapStateToProps, {})(Post)

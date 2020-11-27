import { Divider } from '@material-ui/core'
import React from 'react'
import './Notification.css'
import { withRouter } from 'react-router-dom'
function Notification(props) {
    const { sender, type, postId } = props.notification
    const handlePost = () => {
        console.log('clicked');
        console.log(props);
        props.history.push(`/post/${postId}`)

    }
    return (
        <div className='notification' onClick={handlePost}>

            <div className='notification__right'>
                {

                    type === 'comment' ?

                        (<div className='notification__info'>

                            <p>{sender} commented on your post</p>
                        </div>)
                        : type === 'like' ?
                            (<div className='notification__info'>

                                <p> {sender} liked your post</p>

                            </div>)
                            : type === 'share' ?
                                <div className='notification__info' >

                                    <p>{sender} shared your post</p></div>
                                : null
                }
            </div>
            <Divider light />
        </div>
    )
}

export default withRouter(Notification)

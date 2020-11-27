import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import ChatHeader from '../components/ChatHeader'
import ChatInput from '../components/ChatInput'
import Messages from '../components/Messages'
import './Chat.css'
import { createChat, getMessages } from '../redux/actions/messageActions'

export const Chat = (props) => {

    useEffect(() => {
        if (props.user?.displayName) {
            props.createChat(props.match.params.username, props.user?.displayName)
        }

    }, [props.match.params.username, props.user?.displayName])

    useEffect(() => {
        if (props.user?.displayName) {
            props.getMessages(props.match.params.username, props.user?.displayName)
        }
    }, [props.match.params.username])
    return (
        <div className='chat'>
            <ChatHeader />
            <Messages />
            <ChatInput />
        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.user.user
})




export default connect(mapStateToProps, { createChat, getMessages })(Chat)

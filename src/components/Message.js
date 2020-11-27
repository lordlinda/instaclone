import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Message.css'
import moment from 'moment'
export const Message = (props) => {
    const { username, timestamp, message } = props.message
    return (
        <div className={`message ${username === props.user.displayName && 'message__receiver'} `}>
            <p className='message__username'>{username}</p>
            <p className='message__info'>{message}</p>
            <p className='message__timestamp'>{
                moment(new Date(timestamp?.toDate()
                ).toUTCString()).format('hh:mm A')
            }</p>

        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.user.user
})



export default connect(mapStateToProps, {})(Message)

import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import './ChatInput.css'
import { createMessage } from '../redux/actions/messageActions'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
const ChatInput = (props) => {
    const [message, setMessage] = useState('')

    const handleChange = (e) => {
        setMessage(e.target.value)
    }
    const sendMessage = (e) => {
        e.preventDefault()
        const data = {
            message: message,
            username: props.user.displayName
        }
        props.createMessage(data, props.match.params.username)
        setMessage('')

    }
    return (
        <div className='chatInput'>
            <form>
                <input
                    type='text'
                    placeholder='Send a message...'
                    value={message}
                    onChange={handleChange}
                />
                <button onClick={sendMessage}>

                </button>
            </form>


        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.user.user
})




export default compose(connect(mapStateToProps, { createMessage }), withRouter)(ChatInput)

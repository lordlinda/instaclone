import Message from './Message'
import React, { } from 'react'
import { connect } from 'react-redux'
import './Messages.css'
import { CircularProgress } from '@material-ui/core'
export const Messages = (props) => {
    return (
        <div className='messages'>
            { !props.loading ?
                props.messages.map(message => (
                    <Message message={message} key={message.id} />
                ))
                : <CircularProgress className='spinner' />

            }
        </div>
    )
}

const mapStateToProps = (state) => ({
    messages: state.post.messages,
    loading: state.post.loading
})



export default connect(mapStateToProps)(Messages)

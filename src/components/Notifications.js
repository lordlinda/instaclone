import React, { } from 'react'
import { connect } from 'react-redux'
import Notification from './Notification'

const Notifications = (props) => {
    const { notifications } = props
    return (
        <div className='notifications'>
            {notifications.length > 0 ?
                notifications.map(notification => (
                    <Notification key={notification.id} notification={notification} />
                ))
                : <p className='notifications__message' style={{ margin: '20px' }}>not much going on...contune posting</p>
            }

        </div>
    )
}


export default connect(null)(Notifications)

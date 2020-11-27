import BottomNavigation from '../components/BottomNavigation'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import ActivityHeader from '../components/ActivityHeader'
import Notifications from '../components/Notifications'
import './Activity.css'
import { getNotifications } from '../redux/actions/NotificationsActions'
export const Activity = (props) => {
    const { user, notifications } = props

    useEffect(() => {
        if (user?.uid) {
            props.getNotifications(user.uid)
        }

    }, [])

    return (
        <div className='activity'>
            <ActivityHeader />
            <Notifications notifications={notifications} />
            <BottomNavigation />
        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.user.user,
    notifications: state.user.notifications
})


export default connect(mapStateToProps, { getNotifications })(Activity)

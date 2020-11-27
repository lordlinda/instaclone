import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux'

function AuthGuard({ component: Component, auth, user, ...rest }) {

    return (
        <Route
            {...rest}
            render={(props) => !auth ? <Redirect to='/login' /> : <Component {...props} />}
        />
    )
}
const mapStateToProps = (state) => {
    return {
        auth: state.user.authenticated,
        user: state.user.user
    }
}
export default connect(mapStateToProps)(AuthGuard)

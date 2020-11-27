import React, { } from 'react'
import { connect } from 'react-redux'
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
import { Avatar, IconButton } from '@material-ui/core';
import './BottomNavigation.css'
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'redux'
const BottomNavigation = (props) => {
    const { user } = props
    const handleFileInput = () => {
        document.querySelector('#fileInput').click()
    }
    const handleEditPicture = (e) => {
        if (e.target.files[0]) {

            props.history.push('/create/post', e.target.files[0])
        }
    }

    return (
        <div className='bottomNavigation'>
            <IconButton>
                <Link to='/feed'>
                    <HomeRoundedIcon />
                </Link>

            </IconButton>
            <div>
                <IconButton onClick={handleFileInput}>
                    <AddBoxOutlinedIcon />
                </IconButton>
                <input type='file'
                    id='fileInput'
                    className='fileInput'
                    onChange={handleEditPicture}
                    accept="image/*"
                />
            </div>

            <IconButton>
                <Link to='/activity'>
                    <FavoriteOutlinedIcon />
                </Link>

            </IconButton>
            <Link to={`/profile/${user?.uid}`}>
                <Avatar fontSize='small' alt={`${user.displayName}`} />
            </Link>

        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.user.user,
    profile: state.user.profile
})




export default compose(connect(mapStateToProps), withRouter)(BottomNavigation)

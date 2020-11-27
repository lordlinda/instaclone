import React, { useState } from 'react'
import { connect } from 'react-redux'
import PhotoCameraOutlinedIcon from '@material-ui/icons/PhotoCameraOutlined';
import { IconButton } from '@material-ui/core';
import './FeedHeader.css'
import { Link, withRouter } from 'react-router-dom'
import { compose } from 'redux'
function FeedHeader(props) {

    const handleFileInput = () => {
        document.querySelector('#fileInput').click()
    }
    const handleEditPicture = (e) => {
        if (e.target.files[0]) {
            props.history.push('/create/post', e.target.files[0])
        }
    }
    return (
        <div className='feedHeader'>
            <div>
                <IconButton onClick={handleFileInput}>
                    <PhotoCameraOutlinedIcon fontSize='default' />
                </IconButton>
                <input type='file'
                    id='fileInput'
                    className='fileInput'
                    onChange={handleEditPicture}
                    accept="image/*"
                />
            </div>
        </div >
    )
}

const mapStateToProps = (state) => ({
    posts: state.post.posts,
    user: state.user.user
})



export default compose(connect(mapStateToProps), withRouter)(FeedHeader)

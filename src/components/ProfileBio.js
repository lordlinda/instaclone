import { Avatar, Badge, Button, Dialog, DialogContent, DialogTitle } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import './ProfileBio.css'
import { followUser, unfollowUser, editUserDetails, imageUpload } from '../redux/actions/userActions'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import Input from './Input'
import EditIcon from '@material-ui/icons/Edit';


const ProfileBio = (props) => {
    const [open, toggleOpen] = useState(false)
    const { id, following, followers, username, photoUrl, bio, link, phoneNumber } = props.bio
    const followUser = () => {
        props.followUser(props.match.params.userId, props.user.uid)
    }
    const isFollowing = () => {
        if (props.following.find(following => following.user === props.match.params.userId)) {
            return true
        } else {
            return false
        }
    }
    const unfollowUser = () => {
        props.unfollowUser(props.match.params.userId, props.user.uid)
    }

    const [formData, setFormData] = useState({
        description: '',
        website: '',
        phone: '',
    })
    const { description, website, phone } = formData
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })

    }

    const handleClose = () => {
        toggleOpen(!open)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            bio: formData.description,
            link: formData.website,
            phoneNumber: formData.phone,
            userId: props.user.uid
        }
        props.editUserDetails(data)

        toggleOpen(false)
    }
    useEffect(() => {
        setFormData({
            ...formData,
            description: bio,
            website: link,
            phone: phoneNumber,

        })
    }, [bio, link, phoneNumber])

    const photoUpload = e => {
        if (e.target.files[0]) {
            props.imageUpload(e.target.files[0], props.user.uid)
        }
    }

    const handleEditPicture = () => {
        const fileInput = document.querySelector('#photoUpload')
        fileInput.click()
    }
    return (
        <div className='profileBio'>
            <div className='profileBio__info'>
                <div className='profileBio__top'>
                    <div className='profileBio__headerLeft'>

                        <Badge
                            overlap="circle"
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            badgeContent={props.user.uid === id ?
                                <EditIcon fontSize='small' onClick={handleEditPicture} /> : null}
                        >
                            <Avatar alt={username} src={photoUrl} />
                        </Badge>
                        <input type='file'
                            className='profileBio__imageInput'
                            id='photoUpload'
                            onChange={photoUpload} />

                    </div>
                    <div className='profileBio__headerRight'>
                        <p>{username}</p>
                        {
                            props.user.uid === id ? (
                                <>
                                    <Button onClick={handleClose} variant='outlined' >
                                        Edit Profile
                            </Button>
                                    <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                                        <DialogTitle id="customized-dialog-title" onClose={handleClose}>

                                            Edit profile
                         </DialogTitle>
                                        <DialogContent dividers>
                                            <form >
                                                <Input
                                                    type='text'
                                                    onChange={handleChange}
                                                    value={description}
                                                    name='description'
                                                />
                                                <Input
                                                    type='text'
                                                    onChange={handleChange}
                                                    value={website}
                                                    name='website'
                                                />
                                                <Input
                                                    type='text'
                                                    onChange={handleChange}
                                                    value={phone}
                                                    name='phone'
                                                />


                                                <Button variant='outlined' onClick={handleSubmit}>
                                                    edit
                                           </Button>
                                            </form>

                                        </DialogContent>

                                    </Dialog>
                                </>
                            ) : isFollowing() ? (
                                <Button variant='outlined' onClick={unfollowUser} color='primary'>
                                    unFollow
                                </Button>
                            ) : (
                                        <Button color='primary' variant="contained" onClick={followUser}>
                                            Follow
                                        </Button>
                                    )
                        }

                    </div>
                </div>
                <div className='profileBio__details'>
                    <p>{bio}</p>
                    <a href={link} target='_blank'>{link}</a>
                    <p>{phoneNumber}</p>
                </div>
            </div>
            <div className='profileBio__bottom'>
                <div><p>{props.posts}</p>

                    <span>posts</span>
                </div>
                <div>
                    <p>{followers}</p> <span>
                        followers</span></div>
                <div>
                    <p>{following}</p>
                    <span>
                        following
                        </span></div>
            </div>

        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.user.user,
    following: state.user.following
})


export default compose(connect(mapStateToProps, { followUser, unfollowUser, editUserDetails, imageUpload }), withRouter)(ProfileBio)

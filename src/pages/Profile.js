import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import ProfileBio from '../components/ProfileBio'
import ProfileHeader from '../components/ProfileHeader'
import './Profile.css'
import Posts from '../components/Posts'
import BottomNavigation from '../components/BottomNavigation'
import { getUserProfile, getUsersFollowed } from '../redux/actions/userActions'
export const Profile = (props) => {
    const [posts, setPosts] = useState([])
    const { user } = props
    useEffect(() => {
        props.getUserProfile(props.match.params.userId)
    }, [])

    useEffect(() => {
        setPosts(props.posts.filter(post => post.userId === props.match.params.userId))
    }, [props.posts.length])


    return (
        <div>
            {
                user ?
                    (<>
                        <ProfileHeader />
                        <ProfileBio bio={user} posts={posts.length} />
                        <Posts posts={posts} />
                        <BottomNavigation />
                    </>
                    )
                    : (
                        null
                    )
            }

        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.user.profile,
    posts: state.post.posts,
    comments: state.post.comments,
    following: state.user.following,
    likes: state.user.likes
})



export default connect(mapStateToProps, { getUserProfile, getUsersFollowed })(Profile)

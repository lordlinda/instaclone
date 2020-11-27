import BottomNavigation from '../components/BottomNavigation'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import FeedHeader from '../components/FeedHeader'
import Posts from '../components/Posts'
import { getSavedPosts } from '../redux/actions/SavedActions'
import CircularProgress from '@material-ui/core/CircularProgress';

const Feed = (props) => {

    return (
        <div>
            <FeedHeader />
            <div>
                {
                    props.loading && props.postsuser ?
                        (
                            <CircularProgress />

                        ) : (
                            <>
                                <Posts posts={props.posts} />
                                <BottomNavigation />
                            </>
                        )
                }
            </div>


        </div>
    )
}

const mapStateToProps = (state) => ({
    posts: state.post.posts,
    user: state.user.user,
    loading: state.user.loading
})




export default connect(mapStateToProps, { getSavedPosts })(Feed)

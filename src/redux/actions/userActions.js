import db, { auth, storage } from '../../firebase'
import { SET_USER, SET_USER_PROFILE, GET_FOLLOWING, UNFOLLOW_USER, FOLLOW_USER, LOGOUT } from '../actions/types'
import firebase from 'firebase'
import { getSavedPosts } from './SavedActions'

export const signUpUser = (user, history) => dispatch => {
    auth.createUserWithEmailAndPassword(user.email, user.password)
        .then(authUser => {
            dispatch(createUser(authUser.user))
            dispatch({
                type: SET_USER,
                payload: authUser
            })
            history.push('/feed')
            return authUser.user.updateProfile({
                displayName: user.username
            })

        })
        .catch(error => {
            alert(error)
        })
}

export const signIn = (user, history) => dispatch => {
    auth.signInWithEmailAndPassword(user.email, user.password)
        .then(authUser => {
            dispatch({
                type: SET_USER,
                payload: authUser
            })
            console.log(authUser);
            history.push('/feed')
        })
        .catch(error => {
            alert(error)
        })
}
export const monitorAuthState = () => dispatch => {
    auth.onAuthStateChanged((authUser) => {
        if (authUser) {
            //user has logged in
            console.log(authUser);
            dispatch(getUserData(authUser.uid))
            dispatch(getUsersFollowed(authUser.uid))
            dispatch(getSavedPosts(authUser.displayName))
            dispatch({
                type: SET_USER,
                payload: authUser
            })

        } else {
            //user has logged out
            //set user to null
            dispatch({
                type: SET_USER,
                payload: null
            })
        }
    })
}

export const logout = () => dispatch => {
    auth.signOut()
    dispatch({
        type: LOGOUT
    })
}

export const createUser = (authUser) => dispatch => {
    db.doc(`/users/${authUser.uid}`)
        .get()
        .then(doc => {
            if (doc.exists) {
                console.log('user already exists');

            } else {
                db.doc(`/users/${authUser.uid}`)
                    .set({
                        link: '',
                        username: authUser.displayName,
                        phoneNumber: '',
                        bio: '',
                        email: authUser.email,
                        photoUrl: '',
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        followers: 0,
                        following: 0

                    })
            }
        })

}

export const getUserData = (id) => dispatch => {
    let user = {}
    db.collection('users')
        .doc(id)
        .onSnapshot(
            doc => {
                console.log(doc);

                if (doc.exists) {
                    user.id = doc.id
                    user.link = doc.data().link
                    user.username = doc.data().username
                    user.phoneNumber = doc.data().phoneNumber
                    user.bio = doc.data().bio
                    user.email = doc.data().email
                    user.photoUrl = doc.data().photoUrl
                    user.timestamp = doc.data().timestamp
                    user.followers = doc.data().followers
                    user.following = doc.data().following

                } else {
                    console.log('no user found');
                }

            })
}

export const followUser = (followerId, userId) => dispatch => {
    console.log(followerId, userId)
    db.doc(`followers/${userId}`)
        .get()
        .then(doc => {
            if (doc.exists) {
                console.log('you already exist in the followers action');
                db.collection('followers')
                    .doc(userId)
                    .collection('followees')
                    .where('userId', '==', followerId)
                    .get()
                    .then(snapshot => {
                        console.log(snapshot);
                        if (snapshot.docs.length > 0) {
                            console.log('you already follow this person')
                            snapshot.docs.forEach(doc => {
                                console.log(doc.data());
                            })

                        } else {
                            console.log('u were not following this person');
                            dispatch(followUpUser(followerId, userId))

                        }
                    })

            } else {
                db.doc(`followers/${userId}`)
                    .set({
                        userId: userId
                    })
                dispatch(followUpUser(followerId, userId))
            }
        })

}

export const unfollowUser = (followerId, userId) => dispatch => {
    db.collection('followers')
        .doc(userId)
        .collection('followees')
        .where('userId', '==', followerId)
        .get()
        .then(data => {
            if (!data.empty) {
                data.docs.forEach(doc => {
                    db.collection('followers')
                        .doc(userId)
                        .collection('followees')
                        .doc(doc.id)
                        .delete()
                        .then(doc => {
                            let following = 0
                            console.log('followee deleted');
                            db.collection('users')
                                .doc(userId)
                                .get()
                                .then(doc => {
                                    console.log('updating the number of people u follow')
                                    following = doc.data().following
                                    following--
                                    console.log(following);
                                    db.collection('users')
                                        .doc(userId)
                                        .update({ following: following })
                                        .then(doc => {
                                            console.log('your user following updated')
                                            let followers = 0
                                            db.collection('users')
                                                .doc(followerId)
                                                .get()
                                                .then(doc => {
                                                    followers = doc.data().followers
                                                    followers--
                                                    console.log(followers)
                                                    db.collection('users')
                                                        .doc(followerId)
                                                        .update({ followers: followers })
                                                        .then(doc => {
                                                            console.log('followee followers updated');
                                                            dispatch({
                                                                type: UNFOLLOW_USER,
                                                                payload: followerId
                                                            })

                                                        })
                                                })

                                        })
                                })

                        })
                })

            } else {
                console.log('followee not found');

            }
        })

}
export const getUserProfile = (id) => dispatch => {
    let user = {}
    db.collection('users')
        .doc(id)
        .onSnapshot(
            doc => {
                if (doc.exists) {
                    user.id = doc.id
                    user.link = doc.data().link
                    user.username = doc.data().username
                    user.phoneNumber = doc.data().phoneNumber
                    user.bio = doc.data().bio
                    user.email = doc.data().email
                    user.photoUrl = doc.data().photoUrl
                    user.timestamp = doc.data().timestamp
                    user.followers = doc.data().followers
                    user.following = doc.data().following
                    dispatch({
                        type: SET_USER_PROFILE,
                        payload: user
                    })


                } else {
                    console.log('no user found');

                }


            })
}

export const getUsersFollowed = (id) => dispatch => {
    db.collection('followers')
        .doc(id)
        .collection('followees')
        .onSnapshot(snapshot => {
            let following = []
            snapshot.docs.forEach(doc => {
                following.push({
                    user: doc.data().userId
                })
                dispatch({
                    type: GET_FOLLOWING,
                    payload: following
                })


            })
        })
}

export const followUpUser = (followerId, userId) => dispatch => {
    db.collection('followers')
        .doc(userId)
        .collection('followees')
        .add({
            userId: followerId
        })
        .then(doc => {
            let following = 0
            console.log('you now follow');
            db.collection('users')
                .doc(userId)
                .get()
                .then(doc => {
                    following = doc.data().following
                    following++
                    db.collection('users')
                        .doc(userId)
                        .update({ following: following })
                        .then(doc => {
                            console.log('the number of people u follow has been updated');
                            let followers = 0
                            db.collection('users')
                                .doc(followerId)
                                .get()
                                .then(doc => {
                                    followers = doc.data().followers
                                    followers++
                                    db.collection('users')
                                        .doc(followerId)
                                        .update({ followers: followers })
                                        .then(doc => {
                                            console.log('followees updated')
                                            dispatch({
                                                type: FOLLOW_USER,
                                                payload: followerId
                                            })

                                        })
                                })

                        })
                })

        })
}

export const editUserDetails = (userDetails) => dispatch => {
    db.collection('users')
        .doc(userDetails.userId)
        .update(userDetails)
        .then(docs => {
            console.log('user details updated');

        }).catch(err => {
            console.log(err);

        })
}

export const imageUpload = (image, userId) => dispatch => {
    const uploadTask = storage.ref(`/images/${image.name}`).put(image)
    uploadTask.on('state_changed',
        (snapshot) => {

        },
        (error) => {
            console.log(error);

        },
        () => {
            storage.ref('images').child(image.name).getDownloadURL()
                .then(url => {
                    db.collection('users')
                        .doc(userId)
                        .update({
                            photoUrl: url

                        }).then(doc => {

                        })

                })
        })
}


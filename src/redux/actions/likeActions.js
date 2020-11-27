import db from "../../firebase"
import { GET_LIKES, LIKE_POST, UNLIKE_POST } from './types'
import { createNotification } from './NotificationsActions'

export const getLikes = () => dispatch => {
    db.collection('likes')
        .onSnapshot(snapshot => {
            let likes = []
            if (!snapshot.empty) {
                snapshot.docs.forEach(doc => {
                    likes.push({
                        id: doc.id,
                        postId: doc.data().postId,
                        userId: doc.data().userId
                    })
                })
                dispatch({
                    type: GET_LIKES,
                    payload: likes
                })
            }


        })
}

export const likePost = (like) => dispatch => {
    db.collection('likes')
        .where('userId', '==', like.userId)
        .where('postId', '==', like.postId)
        .get()
        .then(doc => {
            if (doc.empty) {
                let likeCount = 0
                db.collection('likes')
                    .add(like)
                    .then(doc => {

                        console.log(' added');
                        db.collection('posts')
                            .doc(like.postId)
                            .get()
                            .then(snapshot => {
                                likeCount = snapshot.data().likeCount
                                likeCount++
                                db.collection('posts')
                                    .doc(like.postId)
                                    .update({ likeCount: likeCount })
                                    .then(doc => {
                                        dispatch(createNotification(like.postId, like.userId, 'like'))
                                        dispatch({
                                            type: LIKE_POST,
                                            payload: like
                                        })

                                    })
                            })

                    })
            } else {
                console.log('already likes this');

            }
        })

}


export const unlikePost = (like) => dispatch => {
    db.collection('likes')
        .where('postId', '==', like.postId)
        .where('userId', '==', like.userId)
        .limit(1)
        .get()
        .then(data => {
            if (data.empty) {
                console.log('no post with this id');
            }
            let likeCount = 0
            db.collection('posts')
                .doc(like.postId)
                .get()
                .then(doc => {
                    likeCount = doc.data().likeCount
                    data.docs.forEach(doc => {
                        db.collection('likes')
                            .doc(doc.id)
                            .delete()
                            .then(doc => {
                                likeCount--
                                db.collection('posts')
                                    .doc(like.postId)
                                    .update({ likeCount: likeCount })
                                    .then(doc => {
                                        console.log('unliked suceesfull');
                                        dispatch({
                                            type: UNLIKE_POST,
                                            payload: like

                                        })

                                    })
                            }).catch(err => {
                                console.log(err)
                            })
                    })
                })
        })
}


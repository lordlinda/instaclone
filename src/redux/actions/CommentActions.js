import firebase from 'firebase'
import db from '../../firebase'
import { GET_COMMENTS } from './types'

import { createNotification } from './NotificationsActions'
export const getComments = () => dispatch => {
    db.collection('comments')
        .orderBy('timestamp', 'desc')
        .onSnapshot(snapshot => {
            let comments = []
            snapshot.docs.forEach(doc => {
                comments.push({
                    id: doc.id,
                    username: doc.data().username,
                    message: doc.data().message,
                    postId: doc.data().postId,
                    timestamp: doc.data().timestamp

                })
            })

            dispatch({
                type: GET_COMMENTS,
                payload: comments
            })

        })
}

export const createComment = (comment) => dispatch => {
    db.collection('comments')
        .add({
            ...comment,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(doc => {
            console.log('comment added');
            db.collection('posts')
                .doc(comment.postId)
                .get()
                .then(doc => {
                    let commentCount = 0
                    commentCount = doc.data().commentCount
                    commentCount++
                    db.collection('posts')
                        .doc(comment.postId)
                        .update({ commentCount: commentCount })
                        .then(doc => {
                            console.log('comment count increased');
                            dispatch(createNotification(comment.postId, comment.username, 'comment'))

                        })
                })

        })
}


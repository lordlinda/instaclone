import db from '../../firebase'
import { GET_NOTIFICATIONS } from './types'
import firebase from 'firebase'

export const getNotifications = (userId) => dispatch => {
    let notifications = []
    db.collection('notifications')
        .where('receipient', '==', userId)
        .orderBy('timestamp', 'desc')
        .onSnapshot(snapshot => {
            snapshot.docs.forEach(doc => {
                notifications.push({
                    id: doc.id,
                    type: doc.data().type,
                    sender: doc.data().sender,
                    postId: doc.data().postId,
                    timestamp: doc.data().timestamp,
                    receipient: doc.data().receipient
                })
            })

            dispatch({
                type: GET_NOTIFICATIONS,
                payload: notifications
            })
        })
}

export const createNotification = (postId, userId, type) => dispatch => {
    console.log(userId)
    db.collection('posts')
        .doc(postId)
        .onSnapshot(doc => {
            if (doc.exists) {
                db.collection('users')
                    .doc(doc.data().userId)
                    .onSnapshot(docs => {
                        if (docs.data().username !== userId) {
                            db.collection('notifications')
                                .add({
                                    postId: postId,
                                    sender: userId,
                                    receipient: docs.id,
                                    type: type,
                                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                                })
                                .then(doc => {
                                    console.log('notification added');

                                })
                        } else {
                            console.log('cant be notified by ur own activity');

                        }

                    })
            }
        })
}


import firebase from 'firebase'
import db from '../../firebase'
import { GET__ROOM_MESSAGES } from './types'

export const createChat = (username, userId) => dispatch => {
    console.log(username, userId)
    db.collection('rooms')
        .where('chatname', '==', username)
        .where('user', '==', userId)
        .get()
        .then(data => {
            if (!data.empty) {
                console.log('u too were already chatting');
            } else {
                db.collection('rooms')
                    .add({
                        chatname: username,
                        user: userId
                    })
            }

        })
}

export const getMessages = (username, userId) => dispatch => {
    console.log(username, userId);
    db.collection('rooms')
        .where('chatname', '==', username)
        .where('user', '==', userId)
        .get()
        .then(data => {
            if (!data.empty) {
                data.docs.forEach(doc => {
                    db.collection('rooms')
                        .doc(doc.id)
                        .collection('messages')
                        .orderBy('timestamp', 'asc')
                        .onSnapshot(snapshot => {
                            if (!snapshot.empty) {
                                let messages = []
                                snapshot.docs.forEach(doc => {
                                    messages.push({
                                        id: doc.id,
                                        message: doc.data().message,
                                        username: doc.data().username,
                                        timestamp: doc.data().timestamp
                                    })

                                })
                                dispatch({
                                    type: GET__ROOM_MESSAGES,
                                    payload: messages
                                })
                            }

                        })


                })
            }

        })


}

export const createMessage = (message, id) => dispatch => {
    db.collection('rooms')
        .where('chatname', '==', id)
        .where('user', '==', message.username)
        .get()
        .then(data => {
            if (!data.empty) {

                data.docs.forEach(doc => {
                    db.collection('rooms')
                        .doc(doc.id)
                        .collection('messages')
                        .add({
                            message: message.message,
                            username: message.username,
                            timestamp: firebase.firestore.FieldValue.serverTimestamp()
                        })
                })
            }


        })
}



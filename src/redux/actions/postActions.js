import db, { storage } from '../../firebase'
import { GET_POSTS, SET_PROGRESS, GET_POST } from './types'
import firebase from 'firebase'
export const getPosts = () => dispatch => {
    db.collection('posts')
        .orderBy('timestamp', 'desc')
        .onSnapshot(snapshot => {
            let posts = []
            snapshot.docs.forEach(doc => {
                posts.push({
                    id: doc.id,
                    username: doc.data().username,
                    caption: doc.data().caption,
                    imageUrl: doc.data().imageUrl,
                    likeCount: doc.data().likeCount,
                    commentCount: doc.data().commentCount,
                    userId: doc.data().userId
                })
            })

            dispatch({
                type: GET_POSTS,
                payload: posts
            })

        })






}

export const handleUpload = (post) => dispatch => {
    const uploadTask = storage.ref(`images/${post.image.name}`).put(post.image)
    uploadTask.on(
        'state_changed',
        (snapshot) => {
            const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            )
            dispatch({
                type: SET_PROGRESS,
                payload: progress
            })
        },
        (error) => {
            console.log(error);

        },
        () => {
            //complete logic
            storage.ref('images')
                .child(post.image.name)
                .getDownloadURL()
                .then(url => {
                    //post  image insde db
                    db.collection('posts')
                        .add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption: post.caption,
                            imageUrl: url,
                            username: post.username,
                            likeCount: 0,
                            comment: 0,
                            userId: post.userId

                        }).then(doc => {
                            dispatch({
                                type: SET_PROGRESS,
                                payload: 0
                            })
                        })
                })
        }
    )
}


export const getPost = (id) => dispatch => {
    let post = {}
    db.collection('posts')
        .doc(id)
        .get()
        .then(doc => {
            if (doc.exists) {
                post.id = doc.id
                post.caption = doc.data().caption
                post.commentCount = doc.data().commentCount
                post.imageUrl = doc.data().imageUrl
                post.likeCount = doc.data().likeCount
                post.userId = doc.data().userId
                post.username = doc.data().username
                dispatch({
                    type: GET_POST,
                    payload: post
                })

            }

        })
}
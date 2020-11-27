import db from "../../firebase"
import { GET_SAVED_POSTS } from './types'
export const getSavedPosts = (userId) => dispatch => {
    let savedPosts = []
    db.collection('saved')
        .where('userId', '==', userId)
        .onSnapshot(snapshot => {
            snapshot.docs.forEach(data => {
                db.collection('posts')
                    .doc(data.data().postId)
                    .get()
                    .then(doc => {
                        savedPosts.push({
                            id: doc.id,
                            username: doc.data().username,
                            caption: doc.data().caption,
                            imageUrl: doc.data().imageUrl,
                            likeCount: doc.data().likeCount,
                            commentCount: doc.data().commentCount,
                            userId: userId
                        })
                    })
            })
            dispatch({
                type: GET_SAVED_POSTS,
                payload: savedPosts
            })
        })




}

export const savePost = (post) => dispatch => {
    db.collection('saved')
        .where('userId', '==', post.userId)
        .where('postId', '==', post.postId)
        .get()
        .then(doc => {
            if (doc.empty) {
                db.collection('saved')
                    .add(post)
                    .then(doc => {
                        console.log('post saved');
                    })
            } else {
                console.log('already saved this');

            }
        })
}

export const unsavePost = (post) => dispatch => {
    db.collection('saved')
        .where('postId', '==', post.postId)
        .where('userId', '==', post.userId)
        .limit(1)
        .get()
        .then(data => {
            console.log(data);
            if (data.empty) {
                console.log('no post with this id');
            } else {
                data.docs.forEach(doc => {
                    db.collection('saved')
                        .doc(doc.id)
                        .delete()
                        .then(doc => {
                            console.log('saved post deleted sucessfully');

                        }).catch(err => {
                            console.log(err)
                        })
                })
            }

        })
}


import firebase from 'firebase'
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBiYo_fBJRExrGeZKr-RKUFEq9TnvSQ74U",
    authDomain: "instaclone-1edc2.firebaseapp.com",
    databaseURL: "https://instaclone-1edc2.firebaseio.com",
    projectId: "instaclone-1edc2",
    storageBucket: "instaclone-1edc2.appspot.com",
    messagingSenderId: "909493140192",
    appId: "1:909493140192:web:c9fe327d965bce1e36ee85",
    measurementId: "G-6Q1RFQC940"
})

const db = firebaseApp.firestore()
const auth = firebase.auth()
const storage = firebase.storage()

export { auth, storage }
export default db
import firebase from 'firebase'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyCCrFBvNAqzCX8_OmYiwYAunb33HE9m4zQ",
    authDomain: "nuxt-memo-app.firebaseapp.com",
    databaseURL: "https://nuxt-memo-app.firebaseio.com",
    projectId: "nuxt-memo-app",
    storageBucket: "nuxt-memo-app.appspot.com",
    messagingSenderId: "325435828905"
  })
}

export default firebase

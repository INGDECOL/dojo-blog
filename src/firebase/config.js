import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyCA51NciwmD6nhtFF6TEXXd1EVLeRR-30w",
    authDomain: "udemy-vue-firebase-site-208bc.firebaseapp.com",
    projectId: "udemy-vue-firebase-site-208bc",
    storageBucket: "udemy-vue-firebase-site-208bc.appspot.com",
    messagingSenderId: "919946386218",
    appId: "1:919946386218:web:9a2a0148468f0d0bcbdc53"
};
// init firebase
const firebase = initializeApp(firebaseConfig)
//init firestore
const db = getFirestore(firebase)
export  { db }

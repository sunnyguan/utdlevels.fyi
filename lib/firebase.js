import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBcQK2MeI1iHzB-BUaWkAIbprYLsAPFTNU",
    authDomain: "cometvisor-testing.firebaseapp.com",
    projectId: "cometvisor-testing",
    storageBucket: "cometvisor-testing.appspot.com",
    messagingSenderId: "916649227100",
    appId: "1:916649227100:web:ad7eb7ddcb51ee1498c799"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase;
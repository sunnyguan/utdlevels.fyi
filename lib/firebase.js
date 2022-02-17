import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyD6sWIqZLvsHLPbC8aGaOWoHRUZUcGnHWk",
    authDomain: "utdlevelsfyi-baf2f.firebaseapp.com",
    projectId: "utdlevelsfyi-baf2f",
    storageBucket: "utdlevelsfyi-baf2f.appspot.com",
    messagingSenderId: "488434892989",
    appId: "1:488434892989:web:64fed53ab9c19dff39b7d4",
    measurementId: "G-K82C1V3VX0"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase;
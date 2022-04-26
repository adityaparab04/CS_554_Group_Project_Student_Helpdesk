import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import "firebase/firestore";
const firebaseApp = firebase.initializeApp({
        apiKey: "AIzaSyAIktrdu4d1hwhuB9WN4DbN6VU2Q0KoxrU",
        authDomain: "ticketing-system-1c19d.firebaseapp.com",
        databaseURL: "https://ticketing-system-1c19d-default-rtdb.firebaseio.com",
        projectId: "ticketing-system-1c19d",
        storageBucket: "ticketing-system-1c19d.appspot.com",
        messagingSenderId: "1004522528495",
        appId: "1:1004522528495:web:0daf45151ff6c59f16451a",
        measurementId: "G-XLGTCN8GK1"
});
export default firebaseApp;
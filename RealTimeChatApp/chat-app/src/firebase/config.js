import { initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBueLoivde56TbKcfEWzB9f2fBWgaFn5Z0",
    authDomain: "chat-app-cbf00.firebaseapp.com",
    databaseURL: "https://chat-app-cbf00-default-rtdb.firebaseio.com",
    projectId: "chat-app-cbf00",
    storageBucket: "chat-app-cbf00.appspot.com",
    messagingSenderId: "876087306613",
    appId: "1:876087306613:web:5eabb14fa69eceef8acb3c",
    measurementId: "G-6SE34DMYN6"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log("+++++++++++++++++++++++++++++++++")
console.log(app.name)

const auth = getAuth();
const db = getFirestore();

connectAuthEmulator(auth, 'http://localhost:9099');
if(window.location.hostname === 'localhost'){
  connectFirestoreEmulator(db, 'localhost', 8080)
}

export { db, auth, app };
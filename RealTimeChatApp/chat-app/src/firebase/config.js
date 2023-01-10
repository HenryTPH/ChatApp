import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { signInWithPopup, getAuth } from 'firebase/auth';
import { getFirestore  } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBueLoivde56TbKcfEWzB9f2fBWgaFn5Z0",
    authDomain: "chat-app-cbf00.firebaseapp.com",
    projectId: "chat-app-cbf00",
    storageBucket: "chat-app-cbf00.appspot.com",
    messagingSenderId: "876087306613",
    appId: "1:876087306613:web:5eabb14fa69eceef8acb3c",
    measurementId: "G-6SE34DMYN6"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth();
const db = getFirestore();

export { db, auth, app };
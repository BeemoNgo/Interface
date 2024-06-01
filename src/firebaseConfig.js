import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";


//firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyALrjTa9oI6Le_60hTYL6vCjmXnljd1_G4",
    authDomain: "interface-b736b.firebaseapp.com",
    projectId: "interface-b736b",
    storageBucket: "interface-b736b.appspot.com",
    messagingSenderId: "560621672268",
    appId: "1:560621672268:web:4d9b8435582c433999a1e9",
    measurementId: "G-GG7HT9PDEM"
}

//init firebase app
const app = initializeApp(firebaseConfig);
//get authentication 
const auth = getAuth(app)

const firestore = getFirestore(app);

export { app, auth, firestore };

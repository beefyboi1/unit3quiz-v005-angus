import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration
// Get these values from: Firebase Console → Project Settings → Your apps → Web app
// https://console.firebase.google.com/project/unit3quiz-v005-angus/settings/general
const firebaseConfig = {
    apiKey: "AIzaSyBWmCCj2Zoa6q-CS1SDfuaMLw44U7bY_zU",
    authDomain: "unit3quiz-v005-angus.firebaseapp.com",
    projectId: "unit3quiz-v005-angus",
    storageBucket: "unit3quiz-v005-angus.firebasestorage.app",
    messagingSenderId: "931603632892",
    appId: "1:931603632892:web:3d4fab1e536876f23b7d79",
    measurementId: "G-SRZL5HD9J6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;


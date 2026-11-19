import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBgIRVviUA0alFL1yuEKQMJWd9yXIv-o10",
  authDomain: "virtual-internship-mjk.firebaseapp.com",
  projectId: "virtual-internship-mjk",
  storageBucket: "virtual-internship-mjk.firebasestorage.app",
  messagingSenderId: "1003506770620",
  appId: "1:1003506770620:web:fa69144c2c93fa814da6b9"
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
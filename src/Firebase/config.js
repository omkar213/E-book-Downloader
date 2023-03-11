// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage"

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyBn-dArDZCXl0NXjFuK6hQ-aoLcebQMv1M",
  authDomain: "e-book-61cef.firebaseapp.com",
  projectId: "e-book-61cef",
  storageBucket: "e-book-61cef.appspot.com",
  messagingSenderId: "1012831200678",
  appId: "1:1012831200678:web:d650d9203b1aa779571b67",
  measurementId: "G-V4LXD2RC3Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app
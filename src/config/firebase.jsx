// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBfETxxETdNiT19pv1rji6xEuYOuklRNz8",
  authDomain: "nba-app-a9ae1.firebaseapp.com",
  projectId: "nba-app-a9ae1",
  storageBucket: "nba-app-a9ae1.appspot.com",
  messagingSenderId: "949947654141",
  appId: "1:949947654141:web:bf8aae386c831700930394",
  measurementId: "G-0T703DW0QH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import  {getAuth,GoogleAuthProvider} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAcJ0aPBEWCxE4WR_T-M671zUqz3h4ZDlM",
  authDomain: "techvoyage-a63d4.firebaseapp.com",
  projectId: "techvoyage-a63d4",
  storageBucket: "techvoyage-a63d4.appspot.com",
  messagingSenderId: "253465419732",
  appId: "1:253465419732:web:fe08be2a1ab63bc62dc041",
  measurementId: "G-K6GZDFT7HS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const provider = new GoogleAuthProvider();


export default app
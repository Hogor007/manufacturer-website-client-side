// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGvLR7CfwANqDR2zxZzKH9ITAocJ_7NCY",
  authDomain: "cubicspace1.firebaseapp.com",
  projectId: "cubicspace1",
  storageBucket: "cubicspace1.appspot.com",
  messagingSenderId: "257259649399",
  appId: "1:257259649399:web:956b466df086dfa1618972"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXf49oUoLuzFTNeFukbThqGJnEAe9Lvbc",
  authDomain: "personal-f9db9.firebaseapp.com",
  databaseURL: "https://personal-f9db9-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "personal-f9db9",
  storageBucket: "personal-f9db9.appspot.com",
  messagingSenderId: "732308394978",
  appId: "1:732308394978:web:610a78f144af24da959fbb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the database service
const database = getDatabase(app);

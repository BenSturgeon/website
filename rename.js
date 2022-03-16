import { initializeApp } from "firebase/app";
import { getDatabase, ref , child, onValue} from "firebase/database";


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
var pageRef = ref(db, 'pages/');
var db = firebase.database();
var page = db.ref().child('pages/');
var query = users.orderByChild('test')
console.log(query)
// onValue(pageRef, (snap) => {
  db.pageRef.child("test").once('value').then(function(snap) {
  var data = snap.val();
  var update = {};
  var newTitle = "going"
  update[oldTitle] = null;
  update[newTitle] = data;
  return booksRef.update(update);
});
import firebase from 'firebase';
require("firebase/firestore")
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBuYbigctH6zGdZlEbgAP1P4iih8XCxPw4",
  authDomain: "appshop-b8e43.firebaseapp.com",
  databaseURL: "https://appshop-b8e43.firebaseio.com",
  projectId: "appshop-b8e43",
  storageBucket: "appshop-b8e43.appspot.com",
  messagingSenderId: "199409086527",
  appId: "1:199409086527:web:7ccfe1fd07d8ed695c888a",
  measurementId: "G-VP6F6HCQTR"
};

const fb = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export { fb, db }
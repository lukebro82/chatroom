import firebase from "firebase";

const app = firebase.initializeApp({
  apiKey: "AIzaSyBvVclzjrwR7rknBBtmmjOck9fVQdu-g48",
  authDomain: "m6-firebase.firebaseapp.com",
  databaseURL: "https://m6-firebase-default-rtdb.firebaseio.com",
});

const rtdb = firebase.database();

export { rtdb };

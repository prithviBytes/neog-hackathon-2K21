import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
const config = {
  apiKey: "AIzaSyC5B6ZyNXGGiAAByJi53knwvVJEwiwz56w",
  authDomain: "neog-2k21-hackathon.firebaseapp.com",
  projectId: "neog-2k21-hackathon",
  storageBucket: "neog-2k21-hackathon.appspot.com",
  messagingSenderId: "408234924813",
  appId: "1:408234924813:web:581974a71eb4e8d3cb2e44",
  measurementId: "G-GMN06QLCFB",
};

firebase.initializeApp(config);

export const db = firebase.firestore();

export default firebase;

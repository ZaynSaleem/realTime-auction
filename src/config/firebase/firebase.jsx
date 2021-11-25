import firebase from "firebase";
import "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD9Z4_OYqzA_07oRL31MLUQJwVqslBBo4E",
  authDomain: "realtime-auction-cf7d5.firebaseapp.com",
  projectId: "realtime-auction-cf7d5",
  storageBucket: "realtime-auction-cf7d5.appspot.com",
  messagingSenderId: "545497016087",
  appId: "1:545497016087:web:a8c9fabdc1a6a3e8dcb952",
  measurementId: "G-RCN20YSBXL"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();

export default firebase;

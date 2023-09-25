import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyAO4wbrKi0PAhuBJFqyDqbUBaPBDpp6WxU",
  authDomain: "elebase-a74f1.firebaseapp.com",
  databaseURL: "https://elebase-a74f1-default-rtdb.firebaseio.com",
  projectId: "elebase-a74f1",
  storageBucket: "elebase-a74f1.appspot.com",
  messagingSenderId: "997660922195",
  appId: "1:997660922195:web:d8f59a7601468e6b56d1a6",
  measurementId: "G-5K30X0BXKQ"
};

const fireDb = firebase.initializeApp(firebaseConfig);
export default fireDb;  
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/storage";

const firebaseConfig = {
  // apiKey: "AIzaSyA_0I4S5zPAcEtAluipKRumgQJSJYvS1fU",
  // authDomain: "krishi-samarth.firebaseapp.com",
  // projectId: "krishi-samarth",
  // storageBucket: "krishi-samarth.appspot.com",
  // messagingSenderId: "475678434099",
  // appId: "1:475678434099:web:07e55bbe94e31445119446"

  apiKey: "AIzaSyDdjMhkdfJxkl7I5kaHdybMzfz9UEt-GKw",
  authDomain: "digitalknowledgehub112.firebaseapp.com",
  projectId: "digitalknowledgehub112",
  storageBucket: "digitalknowledgehub112.firebasestorage.app",
  messagingSenderId: "420443937669",
  appId: "1:420443937669:web:c9ae14ddd1e76b5a3fc2ec",
  measurementId: "G-FM11D7F5H5"
  };

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage, firebase };

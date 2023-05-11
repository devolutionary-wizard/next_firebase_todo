// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBuxHVQ11BKZTKfeEvfwdJiAYItOdivMsw",
  authDomain: "todo-2b1b3.firebaseapp.com",
  databaseURL: "https://todo-2b1b3-default-rtdb.firebaseio.com",
  projectId: "todo-2b1b3",
  storageBucket: "todo-2b1b3.appspot.com",
  messagingSenderId: "921495019224",
  appId: "1:921495019224:web:750a401a4cb205dbbb81ad",
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

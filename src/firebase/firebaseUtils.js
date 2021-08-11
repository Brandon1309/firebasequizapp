import firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyB1-CQsTnT8VH3p3wRe9WVUyxkN08YGN2Q",
  authDomain: "my-quiz-app-react.firebaseapp.com",
  projectId: "my-quiz-app-react",
  storageBucket: "my-quiz-app-react.appspot.com",
  messagingSenderId: "384084175560",
  appId: "1:384084175560:web:571afd6f0720aa459813fd",
  measurementId: "G-JNF7NHBLSS",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export default firebase;

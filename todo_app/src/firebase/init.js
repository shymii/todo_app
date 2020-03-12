import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var firebaseConfig = {
    apiKey: "AIzaSyB4xg8XnGRRjoh-CzLLMJmTmgCvoDYjgWo",
    authDomain: "todo-a40a4.firebaseapp.com",
    databaseURL: "https://todo-a40a4.firebaseio.com",
    projectId: "todo-a40a4",
    storageBucket: "todo-a40a4.appspot.com",
    messagingSenderId: "287566285570",
    appId: "1:287566285570:web:f657404e40a4084104901b",
    measurementId: "G-8VEGW804ZP"
  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);

  export default firebaseApp.firestore()
import firebase from 'firebase';

try {
  const config = {
    apiKey: "AIzaSyClbj41UhIs2jJjkE-Hp4q_f3BfWGESLqg",
    authDomain: "nick-todo-app-8a4b3.firebaseapp.com",
    
    databaseURL:
        "https://nick-todo-app-8a4b3.firebaseio.com",

    storageBucket: "nick-todo-app-8a4b3.appspot.com",
    messagingSenderId: "842263876367"
  };

  firebase.initializeApp(config);
}catch(e) {

}

export const firebaseRef = firebase.database().ref();
export default firebase;

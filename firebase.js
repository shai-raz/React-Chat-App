import firebase from 'firebase/app'
import "firebase/auth"
import "firebase/firestore"

const app = firebase.initializeApp({
  apiKey: "AIzaSyBVnUxjj-7S6j1PdRwyX1R4OVj-sJwIA5E",
  authDomain: "react-login-test-d8f1f.firebaseapp.com",
  projectId: "react-login-test-d8f1f",
  storageBucket: "react-login-test-d8f1f.appspot.com",
  messagingSenderId: "6911833818",
  appId: "1:6911833818:web:6ada99989d126476a757e3"
});

const db = app.firestore();
export { db };
export default app;


/*import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBVnUxjj-7S6j1PdRwyX1R4OVj-sJwIA5E",
  authDomain: "react-login-test-d8f1f.firebaseapp.com",
  projectId: "react-login-test-d8f1f",
  storageBucket: "react-login-test-d8f1f.appspot.com",
  messagingSenderId: "6911833818",
  appId: "1:6911833818:web:6ada99989d126476a757e3"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

export { auth };
export default db;*/
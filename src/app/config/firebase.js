import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: 'rapidml.firebaseapp.com',
  databaseURL: 'https://rapidml.firebaseio.com',
  projectId: 'rapidml',
  storageBucket: 'rapidml.appspot.com',
  messagingSenderId: '230159999974'
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;

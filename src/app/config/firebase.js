import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCYjNCo2Oh9S7PxUc94z8NOyHvKMJIIpt4',
  authDomain: 'rapidml.firebaseapp.com',
  databaseURL: 'https://rapidml.firebaseio.com',
  projectId: 'rapidml',
  storageBucket: 'rapidml.appspot.com',
  messagingSenderId: '230159999974'
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;

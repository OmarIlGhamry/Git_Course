import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBzYAPekM8cqK3MpV6RyOf9jwajtPiVxR0",
  authDomain: "pharmacy-57307.firebaseapp.com",
  projectId: "pharmacy-57307",
  storageBucket: "pharmacy-57307.appspot.com",
  messagingSenderId: "653966313761",
  appId: "1:653966313761:web:caddd3310ec449770ed660",
  measurementId: "G-MEHZE0RNRL"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };  

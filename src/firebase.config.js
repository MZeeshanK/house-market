// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBmI0OlrAHOMarOqm_h68U-DcYys9mlcvw',
  authDomain: 'house-market-73db4.firebaseapp.com',
  projectId: 'house-market-73db4',
  storageBucket: 'house-market-73db4.appspot.com',
  messagingSenderId: '739962970589',
  appId: '1:739962970589:web:d25873a8fe3c0ba99c5634',
  measurementId: 'G-FDJ0C7QVVW',
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();

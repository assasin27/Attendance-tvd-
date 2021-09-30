import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyBr-mcybzO9tQptvYeML5nVkF688BjCq4g',
  authDomain: 'school-attendance-a7767.firebaseapp.com',
  databaseURL: 'https://school-attendance-a7767-default-rtdb.firebaseio.com',
  projectId: 'school-attendance-a7767',
  storageBucket: 'school-attendance-a7767.appspot.com',
  messagingSenderId: '952020323672',
  appId: '1:952020323672:web:fb8d1b36b2db769eb6e92d',
  measurementId: 'G-MTQQVVBGQ5',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.database();

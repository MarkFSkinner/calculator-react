import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import * as firebase from 'firebase';

const FIREBASE_API_KEY = process.env.REACT_APP_FIREBASE_API_KEY;

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: "calculator-2aef9.firebaseapp.com",
  databaseURL: "https://calculator-2aef9.firebaseio.com",
  projectId: "calculator-2aef9",
  storageBucket: "calculator-2aef9.appspot.com",
  messagingSenderId: "25160268493",
  appId: "1:25160268493:web:3805d00e144efecf"
};

firebase.initializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
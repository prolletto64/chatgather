//react stuff
import React, { useRef, useState } from 'react';
import './App.css';
//firebase stuff
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/analytics';
//firebase hooks stuff
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MESURAMENT_ID
})

const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();

function App() {

  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>
        <h1>chatgather</h1>
        <SignOut />
      </header>

      <section>
        {user ? <Chat /> : <Login />}
      </section>

    </div>
  );
}

function Login() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <>
      <button className="login-btn" onClick={signInWithGoogle}>Google Sing In</button>
      <p>Do not violate the community guidelines or you will be banned for life!</p>
    </>
  )
}

function Chat() {

}

function SignOut() {
  return auth.currentUser && (
    <button className="so-btn" onClick={() => auth.signOut()}>Sign Out</button>
  )
}

export default App;

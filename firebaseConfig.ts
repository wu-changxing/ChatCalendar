// firebaseConfig.ts
import { initializeApp, FirebaseApp, getApps } from 'firebase/app';
import { getAuth, Auth,signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBLrH5vsJbU4TeSlaGepD4O-Njpl7tbM4A",
  authDomain: "chatcalendar-4665d.firebaseapp.com",
  projectId: "chatcalendar-4665d",
  storageBucket: "chatcalendar-4665d.appspot.com",
  messagingSenderId: "324041715316",
  appId: "1:324041715316:web:50503068df5bd1fe31eb21",
  measurementId: "G-6LM0BVNJRB"
};


const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/calendar');

const auth = getAuth();
signInWithPopup(auth, provider)
  .then((result) => {
    // User signed in successfully
    const user = result.user;
    // You can access the user object here and get the access token
    // user.getIdToken().then((accessToken) => {
    //   // Use the access token to make API requests
    // });
  })
  .catch((error) => {
    // Handle sign-in errors
    console.error('Error signing in:', error);
  });

let app: FirebaseApp;


if (!getApps().length) {
  app = initializeApp(firebaseConfig);
  
}

export { app, auth };
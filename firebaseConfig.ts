// firebaseConfig.ts
import { initializeApp, FirebaseApp, getApps } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBLrH5vsJbU4TeSlaGepD4O-Njpl7tbM4A",
  authDomain: "chatcalendar-4665d.firebaseapp.com",
  projectId: "chatcalendar-4665d",
  storageBucket: "chatcalendar-4665d.appspot.com",
  messagingSenderId: "324041715316",
  appId: "1:324041715316:web:50503068df5bd1fe31eb21",
  measurementId: "G-6LM0BVNJRB"
};

let app: FirebaseApp;
let auth: Auth;

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
}

export { app, auth };
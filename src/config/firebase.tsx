// Import the functions you need from the SDKs you need
import { initializeApp, type FirebaseOptions } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig: FirebaseOptions = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const fireBaseApp = initializeApp(firebaseConfig);
const fireBaseAuth = getAuth(fireBaseApp);
const googleAuthProvider = new GoogleAuthProvider();
const analytics = getAnalytics(fireBaseApp);
const facebookAuthProvider = new FacebookAuthProvider();
// const microsoftAuthProvider = new auth.OAuthProvider("microsoft.com");
export {
  fireBaseApp,
  fireBaseAuth,
  googleAuthProvider,
  analytics,
  facebookAuthProvider,
  // microsoftAuthProvider,
};

//https://devbills-d6a1c.firebaseapp.com/__/auth/handler

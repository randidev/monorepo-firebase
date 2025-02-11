import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyCBqBg1TmbDXQhyQV23SlRS41Iqc9qHgNI",
  authDomain: "ebuddy-71246.firebaseapp.com",
  projectId: "ebuddy-71246",
  storageBucket: "ebuddy-71246.firebasestorage.app",
  messagingSenderId: "491397134391",
  appId: "1:491397134391:web:a105e98f746ebbd87827b2",
  measurementId: "G-312XPHTPPW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export {auth}
import { getFirestore } from "firebase-admin/firestore";
import * as admin from "firebase-admin";

const firebaseConfig = {
  apiKey: "AIzaSyCBqBg1TmbDXQhyQV23SlRS41Iqc9qHgNI",
  authDomain: "ebuddy-71246.firebaseapp.com",
  projectId: "ebuddy-71246",
  storageBucket: "ebuddy-71246.firebasestorage.app",
  messagingSenderId: "491397134391",
  appId: "1:491397134391:web:531a3caa2e79975c7827b2",
  measurementId: "G-2X1W8589JG",
};

admin.initializeApp(firebaseConfig);

const db = getFirestore();

export { db };

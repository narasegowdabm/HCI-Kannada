// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";  // Import Firestore

// Your Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPSMWxPwPPW9qghY2QCwudjk9iokIkD5w",
  authDomain: "hci-kannada.firebaseapp.com",
  projectId: "hci-kannada",
  storageBucket: "hci-kannada.firebasestorage.app",
  messagingSenderId: "184927633006",
  appId: "1:184927633006:web:454f85530a553ea6a2307f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);  // Initialize Firestore

export { auth, db };  // Export both auth and db

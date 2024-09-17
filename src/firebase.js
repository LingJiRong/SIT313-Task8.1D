// Import necessary functions from Firebase SDKs
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyCSFDNIi7CkQVB5ykK-RoXOzjB9CyMievk",
  authDomain: "deakin-web-app-8146a.firebaseapp.com",
  projectId: "deakin-web-app-8146a",
  storageBucket: "deakin-web-app-8146a.appspot.com",
  messagingSenderId: "517574072740",
  appId: "1:517574072740:web:3ac7fe80b960d7f3688931",
  measurementId: "G-Q4Z9RENVB3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Storage
const db = getFirestore(app);
const storage = getStorage(app);

// Export the Firestore and Storage instances
export { db, storage };

import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAOXWTS7yo3PG77YMODiJ4D0PCd7OmeG-s",
  authDomain: "project-cost-tracker-3be19.firebaseapp.com",
  projectId: "project-cost-tracker-3be19",
  storageBucket: "project-cost-tracker-3be19.firebasestorage.app",
  messagingSenderId: "865461053580",
  appId: "1:865461053580:web:3247b32cd42de6bb5d73a9",
  measurementId: "G-6FP7V635VF"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export { app, auth , db };
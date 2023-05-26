// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPxCFnlYLY0MTNWL6TPFP2zPoYXKdRGH4",
  authDomain: "appnoticias-4d309.firebaseapp.com",
  projectId: "appnoticias-4d309",
  storageBucket: "appnoticias-4d309.appspot.com",
  messagingSenderId: "452060283375",
  appId: "1:452060283375:web:c5071710c5218e9fe3f61a",
  measurementId: "G-608NL35R4V"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export const FIRESTORE_STORAGE = getStorage(FIREBASE_APP);
const analytics = getAnalytics(FIREBASE_APP);
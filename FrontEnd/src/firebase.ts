// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBPTdN8elt0TtIFBFOZGFtossiLHafhsp4",
  authDomain: "kaolin-all-instruments.firebaseapp.com",
  projectId: "kaolin-all-instruments",
  storageBucket: "kaolin-all-instruments.appspot.com",
  messagingSenderId: "690178895692",
  appId: "1:690178895692:web:aa2660a0eee8c5c6bce9e9",
  measurementId: "G-LLL9FR24HD",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

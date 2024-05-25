import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCHdb8nMQuT1G-f8-PF6j0N2LK4EFssCvI",
  authDomain: "chatroom-7ea4b.firebaseapp.com",
  projectId: "chatroom-7ea4b",
  storageBucket: "chatroom-7ea4b.appspot.com",
  messagingSenderId: "385384936893",
  appId: "1:385384936893:web:994b3909e50e554fa30ed4",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();

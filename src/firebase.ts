// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDH8FJDdwaq2Q1y4BR2lnYBa1JC_Y--9Nw",
  authDomain: "lume-filmes.firebaseapp.com",
  projectId: "lume-filmes",
  storageBucket: "lume-filmes.firebasestorage.app",
  messagingSenderId: "927308389261",
  appId: "1:927308389261:web:dc1ef706d1f651f0bc3bc4",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

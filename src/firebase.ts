// firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD-ExemploAleatorio1234567890",
  authDomain: "meu-projeto-exemplo.firebaseapp.com",
  databaseURL: "https://meu-projeto-exemplo-default-rtdb.firebaseio.com",
  projectId: "meu-projeto-exemplo",
  storageBucket: "meu-projeto-exemplo.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890",
  measurementId: "G-ABCDEF1234"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Serviços que você pode usar
const auth = getAuth(app);
const database = getDatabase(app);
const firestore = getFirestore(app);

export { app, auth, database, firestore };

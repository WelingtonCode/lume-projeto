// src/environments/firebase.ts ou src/app/firebase.ts

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Substitua com as suas credenciais reais do Firebase
const firebaseConfig = {
  apiKey: 'SUA_API_KEY',
  authDomain: 'SEU_PROJETO.firebaseapp.com',
  projectId: 'SEU_PROJETO',
  storageBucket: 'SEU_PROJETO.appspot.com',
  messagingSenderId: 'SEU_MESSAGING_ID',
  appId: 'SEU_APP_ID',
  measurementId: 'SEU_MEASUREMENT_ID' // opcional
};

// Inicializa o Firebase App
const app = initializeApp(firebaseConfig);

// Exporta os serviços que você for usar
export const auth = getAuth(app);
export const db = getFirestore(app);

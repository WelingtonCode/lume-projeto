// firebaseConfig.ts
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCmsF5Xfgne6UtgXk6l2CyChEo5k2L6QSU",
  authDomain: "banco-dados-fab57.firebaseapp.com",
  databaseURL: "https://banco-dados-fab57-default-rtdb.firebaseio.com",
  projectId: "banco-dados-fab57",
  storageBucket: "banco-dados-fab57.firebasestorage.app",
  messagingSenderId: "376183814403",
  appId: "1:376183814403:web:cc0b726dcf083f0dd41136",
  measurementId: "G-R7DZ590YQ6"
};

export const app = initializeApp(firebaseConfig);

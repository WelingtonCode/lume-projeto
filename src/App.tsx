import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "./firebase";

export default function AuthForm() {
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Erro no login Google:", error);
    }
  };

  return (
    <div>
      <button onClick={handleGoogleLogin}>
        Login com Google
      </button>
    </div>
  );
}

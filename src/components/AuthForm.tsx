import React, { useState, FormEvent } from "react";
import { auth } from "firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from "firebase/auth";

export default function AuthForm() {
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [modoLogin, setModoLogin] = useState<boolean>(true);
  const [erro, setErro] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErro("");
    try {
      if (!email || !senha) {
        setErro("Preencha todos os campos.");
        return;
      }

      if (modoLogin) {
        await signInWithEmailAndPassword(auth, email, senha);
      } else {
        await createUserWithEmailAndPassword(auth, email, senha);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErro(error.message);
      } else {
        setErro(String(error));
      }
    }
  };

  const loginComGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      setErro(error.message);
    }
  };

  const loginComFacebook = async () => {
    const provider = new FacebookAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      setErro(error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-black text-yellow-400 rounded-2xl space-y-4 max-w-sm mx-auto mt-8 shadow-lg"
    >
      <h2 className="text-2xl font-bold text-center">
        {modoLogin ? "Entrar" : "Registrar"}
      </h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="E-mail"
        className="w-full p-2 rounded bg-gray-800 text-white placeholder-gray-400"
      />
      <input
        type="password"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        placeholder="Senha"
        className="w-full p-2 rounded bg-gray-800 text-white placeholder-gray-400"
      />
      {erro && (
        <p className="text-red-500 text-center font-semibold">{erro}</p>
      )}
      <button
        type="submit"
        className="bg-yellow-400 text-black py-2 px-4 rounded w-full font-semibold"
      >
        {modoLogin ? "Entrar" : "Registrar"}
      </button>

      <div className="flex flex-col space-y-2">
        <button
          type="button"
          onClick={loginComGoogle}
          className="bg-white text-black py-2 px-4 rounded font-semibold hover:bg-gray-200"
        >
          Entrar com Google
        </button>
        <button
          type="button"
          onClick={loginComFacebook}
          className="bg-blue-600 text-white py-2 px-4 rounded font-semibold hover:bg-blue-700"
        >
          Entrar com Facebook
        </button>
      </div>

      <p
        className="text-sm text-center text-gray-400 cursor-pointer hover:underline"
        onClick={() => setModoLogin(!modoLogin)}
      >
        {modoLogin ? "Não tem conta? Cadastre-se" : "Já tem conta? Entre"}
      </p>
    </form>
  );
}

import React, { useState, FormEvent } from "react";
import { auth, googleProvider } from "../firebase";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";

export default function AuthForm() {
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [modoLogin, setModoLogin] = useState<boolean>(true);
  const [erro, setErro] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErro("");
    if (!email || !senha) {
      setErro("Preencha todos os campos.");
      return;
    }
    setLoading(true);
    try {
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
    setLoading(false);
  };

  const loginComGoogle = async () => {
    setErro("");
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      setErro(error.message || "Erro no login com Google");
    }
    setLoading(false);
  };

  const loginComFacebook = async () => {
    setErro("");
    setLoading(true);
    const provider = new FacebookAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      setErro(error.message || "Erro no login com Facebook");
    }
    setLoading(false);
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
        disabled={loading}
      />
      <input
        type="password"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        placeholder="Senha"
        className="w-full p-2 rounded bg-gray-800 text-white placeholder-gray-400"
        disabled={loading}
      />
      {erro && (
        <p className="text-red-500 text-center font-semibold">{erro}</p>
      )}
      <button
        type="submit"
        disabled={loading}
        className={`bg-yellow-400 text-black py-2 px-4 rounded w-full font-semibold ${
          loading ? "opacity-50 cursor-not-allowed" : "hover:bg-yellow-500"
        }`}
      >
        {loading ? "Carregando..." : modoLogin ? "Entrar" : "Registrar"}
      </button>

      <div className="flex flex-col space-y-2">
        <button
          type="button"
          onClick={loginComGoogle}
          disabled={loading}
          className={`bg-white text-black py-2 px-4 rounded font-semibold ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"
          }`}
        >
          Entrar com Google
        </button>
        <button
          type="button"
          onClick={loginComFacebook}
          disabled={loading}
          className={`bg-blue-600 text-white py-2 px-4 rounded font-semibold ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
          }`}
        >
          Entrar com Facebook
        </button>
      </div>

      <p
        className="text-sm text-center text-gray-400 cursor-pointer hover:underline"
        onClick={() => !loading && setModoLogin(!modoLogin)}
      >
        {modoLogin ? "Não tem conta? Cadastre-se" : "Já tem conta? Entre"}
      </p>
    </form>
  );
}

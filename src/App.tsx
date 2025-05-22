import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "firebase";
import AuthForm from "./components/AuthForm";
import { FiLogIn, FiLogOut } from "react-icons/fi"; // Ícones de login/logout

export default function App() {
  const [usuario, setUsuario] = useState<User | null>(null);
  const [mostrarLogin, setMostrarLogin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUsuario(user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUsuario(null);
    } catch (error) {
      console.error("Erro ao deslogar:", error);
    }
  };

  if (mostrarLogin && !usuario) {
    return <AuthForm />;
  }

  return (
    <div className="text-white">
      <header className="p-4 bg-black flex justify-between items-center">
        <h1 className="text-2xl text-yellow-400 font-bold">Lume Filmes</h1>

        {!usuario ? (
          <button
            onClick={() => setMostrarLogin(true)}
            className="text-yellow-400 flex items-center gap-2 hover:underline"
          >
            <FiLogIn size={20} />
            Login
          </button>
        ) : (
          <button
            onClick={handleLogout}
            className="text-yellow-400 flex items-center gap-2 hover:underline"
          >
            <FiLogOut size={20} />
            Logout
          </button>
        )}
      </header>

      {/* Aqui entra seu app de filmes */}
      <main className="p-6">
        {usuario ? (
          <p className="mb-4">Olá, {usuario.email}</p>
        ) : (
          <p className="text-gray-400">Navegue livremente, ou faça login para salvar favoritos.</p>
        )}

        {/* Substitua por seu app real */}
        <p>Conteúdo do app de filmes aqui...</p>
      </main>
    </div>
  );
}

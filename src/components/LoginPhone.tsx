import React, { useState } from "react";
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier, ConfirmationResult, User } from "firebase/auth";

declare global {
  interface Window {
    recaptchaVerifier?: RecaptchaVerifier;
  }
}

const auth = getAuth();

const LoginPhone: React.FC = () => {
  const [phone, setPhone] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const setupRecaptcha = () => {
    if (window.recaptchaVerifier) {
      window.recaptchaVerifier.clear(); // limpa o recaptcha anterior
    }
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response: any) => {
          console.log("reCAPTCHA resolvido");
        },
        "expired-callback": () => {
          console.log("reCAPTCHA expirado");
        },
      },
      auth
    );
  };

  const requestOtp = async () => {
    if (!phone.startsWith("+")) {
      setMessage("Por favor, insira o número no formato internacional, ex: +5511999999999");
      return;
    }

    setLoading(true);
    setMessage("");
    setupRecaptcha();

    const appVerifier = window.recaptchaVerifier;
    if (!appVerifier) {
      setMessage("Erro: Recaptcha não está pronto.");
      setLoading(false);
      return;
    }

    try {
      const confirmation = await signInWithPhoneNumber(auth, phone, appVerifier);
      setConfirmationResult(confirmation);
      setMessage("Código enviado para o telefone!");
      setOtp(""); // limpa o input do código
    } catch (error: any) {
      console.error(error);
      setMessage("Erro ao enviar código: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (!confirmationResult) {
      setMessage("Primeiro envie o código");
      return;
    }
    if (otp.trim().length === 0) {
      setMessage("Por favor, insira o código recebido");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const result = await confirmationResult.confirm(otp);
      setUser(result.user);
      setMessage("Login com telefone feito com sucesso!");
    } catch (error: any) {
      console.error(error);
      setMessage("Código inválido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Login com telefone</h2>

      <input
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="+5511999999999"
        disabled={loading}
      />

      <button onClick={requestOtp} disabled={loading}>
        {loading ? "Enviando código..." : "Enviar código"}
      </button>

      <div id="recaptcha-container"></div>

      <input
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="Digite o código"
        disabled={loading || !confirmationResult}
      />

      <button onClick={verifyOtp} disabled={loading || !confirmationResult}>
        {loading ? "Confirmando..." : "Confirmar código"}
      </button>

      {message && <p>{message}</p>}

      {user && <p>Usuário logado: {user.phoneNumber}</p>}
    </div>
  );
};

export default LoginPhone;

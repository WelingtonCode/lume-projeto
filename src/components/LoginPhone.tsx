 import React, { useState } from "react";
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier, ConfirmationResult, User } from "firebase/auth";

const auth = getAuth();

const LoginPhone: React.FC = () => {
  const [phone, setPhone] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response: any) => {
            console.log("reCAPTCHA resolved");
          },
          "expired-callback": () => {
            console.log("reCAPTCHA expired");
          },
        },
        auth
      );
    }
  };

  const requestOtp = () => {
    setupRecaptcha();

    const appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, phone, appVerifier)
      .then((confirmationResult) => {
        setConfirmationResult(confirmationResult);
        alert("Código enviado para o telefone!");
      })
      .catch((error) => {
        console.error(error);
        alert("Erro ao enviar código");
      });
  };

  const verifyOtp = () => {
    if (!confirmationResult) {
      alert("Primeiro envie o código");
      return;
    }

    confirmationResult
      .confirm(otp)
      .then((result) => {
        setUser(result.user);
        alert("Login com telefone feito com sucesso! Usuário: " + result.user.phoneNumber);
      })
      .catch((error) => {
        console.error(error);
        alert("Código inválido");
      });
  };

  return (
    <div>
      <h2>Login com telefone</h2>
      <input
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="+5511999999999"
      />
      <button onClick={requestOtp}>Enviar código</button>

      <div id="recaptcha-container"></div>

      <input
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="Digite o código"
      />
      <button onClick={verifyOtp}>Confirmar código</button>

      {user && <p>Usuário logado: {user.phoneNumber}</p>}
    </div>
  );
};

export default LoginPhone;


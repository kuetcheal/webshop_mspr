// src/pages/Login.jsx
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const [username, setU] = useState("");
  const [password, setP] = useState("");
  const [err, setErr] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      await login(username, password);
      window.location.href = "/admin";
    } catch (e) {
      setErr(e.message || "Échec de connexion");
    }
  };

  return (
    <form onSubmit={onSubmit} style={{ maxWidth: 360, margin: "80px auto" }}>
      <h2>Connexion</h2>
      {err && <p style={{ color: "red" }}>{err}</p>}
      <input value={username} onChange={(e)=>setU(e.target.value)} placeholder="Username" />
      <input value={password} onChange={(e)=>setP(e.target.value)} type="password" placeholder="Password" />
      <button type="submit">Se connecter</button>
    </form>
  );
}

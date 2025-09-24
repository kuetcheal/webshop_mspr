import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom"; 
import "./AuthModal.css";

export default function AuthModal({ open, onClose }) {
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ username: "", password: "" });
  const [status, setStatus] = useState(null);
  const navigate = useNavigate();

  if (!open) return null;

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      try {
        setStatus("loading");
        await login(form.username, form.password);
        setStatus("success");
        onClose();
      } catch (err) {
        console.error(err);
        setStatus("error");
      }
    } else {
      // 👉 au lieu de créer un client ici, on redirige vers ClientForm
      navigate("/client-form");
      onClose();
    }
  };

  return (
    <div className="auth-modal-backdrop">
      <div className="auth-modal">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>{isLogin ? "Connexion" : "Inscription"}</h2>

        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Email"
            value={form.username}
            onChange={onChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={form.password}
            onChange={onChange}
            required
          />

          <button type="submit" className="auth-btn">
            {isLogin ? "Se connecter" : "S’inscrire"}
          </button>
        </form>

        {status === "loading" && (
          <p className="cf-alert cf-alert--info">Envoi en cours…</p>
        )}
        {status === "success" && isLogin && (
          <p className="cf-alert cf-alert--success">Connexion réussie ✅</p>
        )}
        {status === "error" && isLogin && (
          <p className="cf-alert cf-alert--error">Erreur lors de la connexion</p>
        )}

        <p>
          {isLogin ? "Pas encore de compte ?" : "Déjà inscrit ?"}{" "}
          <span
            className="auth-link"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Créer un compte" : "Se connecter"}
          </span>
        </p>
      </div>
    </div>
  );
}

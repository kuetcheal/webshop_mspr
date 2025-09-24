import { useState } from "react";
import { createClient } from "@/api/clientApi.js";
import "./register.css";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    firstName: "",
    lastName: "",
    postalCode: "",
    city: "",
    companyName: "",
    profile: ""
  });
  const [status, setStatus] = useState(null);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await createClient(form);
      setStatus("success");
      setForm({
        username: "",
        firstName: "",
        lastName: "",
        postalCode: "",
        city: "",
        companyName: "",
        profile: ""
      });
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <div className="cf-container">
      <div className="cf-card">
        <h1 className="cf-title">Inscription</h1>

        <form onSubmit={onSubmit} className="cf-form">
          <input
            className="cf-input"
            name="username"
            value={form.username}
            onChange={onChange}
            placeholder="Email"
            required
          />

          <div className="cf-row cf-col-2">
            <input
              className="cf-input"
              name="firstName"
              value={form.firstName}
              onChange={onChange}
              placeholder="Prénom"
              required
            />
            <input
              className="cf-input"
              name="lastName"
              value={form.lastName}
              onChange={onChange}
              placeholder="Nom"
              required
            />
          </div>

          <div className="cf-row cf-col-2">
            <input
              className="cf-input"
              name="postalCode"
              value={form.postalCode}
              onChange={onChange}
              placeholder="Code postal"
            />
            <input
              className="cf-input"
              name="city"
              value={form.city}
              onChange={onChange}
              placeholder="Ville"
            />
          </div>

          <input
            className="cf-input"
            name="companyName"
            value={form.companyName}
            onChange={onChange}
            placeholder="Entreprise"
          />

          <textarea
            className="cf-textarea"
            name="profile"
            value={form.profile}
            onChange={onChange}
            placeholder="Profil / notes"
            rows={4}
          />

          <button type="submit" className="cf-btn cf-btn--primary">
            S’inscrire
          </button>
        </form>

        {status === "loading" && <p className="cf-alert cf-alert--info">Envoi en cours…</p>}
        {status === "success" && <p className="cf-alert cf-alert--success">Compte créé ✅</p>}
        {status === "error" && <p className="cf-alert cf-alert--error">Erreur lors de l’inscription</p>}
      </div>
    </div>
  );
}

import { useState } from "react";
import { createClient } from "@/api/clientApi.js";


export default function ClientForm() {
  const [form, setForm] = useState({
    username: "", firstName: "", lastName: "",
    postalCode: "", city: "", companyName: "", profile: ""
  });
  const [status, setStatus] = useState(null);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await createClient(form);
      setStatus("success");
      setForm({ username:"", firstName:"", lastName:"", postalCode:"", city:"", companyName:"", profile:"" });
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Nouveau client</h1>
      <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4">
        <input name="username"    value={form.username}    onChange={onChange} placeholder="Identifiant" required />
        <div className="grid grid-cols-2 gap-4">
          <input name="firstName" value={form.firstName}   onChange={onChange} placeholder="Prénom" required />
          <input name="lastName"  value={form.lastName}    onChange={onChange} placeholder="Nom" required />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input name="postalCode" value={form.postalCode} onChange={onChange} placeholder="Code postal" />
          <input name="city"       value={form.city}       onChange={onChange} placeholder="Ville" />
        </div>
        <input name="companyName"  value={form.companyName} onChange={onChange} placeholder="Entreprise" />
        <textarea name="profile"   value={form.profile}     onChange={onChange} placeholder="Profil / notes" rows={4}/>
        <button type="submit">Enregistrer</button>
      </form>

      {status === "loading" && <p>Envoi en cours…</p>}
      {status === "success" && <p style={{color:"green"}}>Client créé ✅</p>}
      {status === "error" && <p style={{color:"red"}}>Erreur lors de l’enregistrement</p>}
    </div>
  );
}

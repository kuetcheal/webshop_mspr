// src/pages/Account.jsx
import React from "react";
import { deleteClient } from "@/api/clientApi"; // ton API
import { useAuth } from "@/context/AuthContext"; // si tu as un contexte d'authentification

function Account() {
  const { user, logout } = useAuth(); // récupère l'utilisateur connecté

  const handleDelete = async () => {
    if (window.confirm("Voulez-vous vraiment supprimer votre compte ?")) {
      try {
        await deleteClient(user.id);
        alert("Votre compte a été supprimé !");
        logout(); // déconnecte l'utilisateur après suppression
      } catch (error) {
        alert("Erreur lors de la suppression du compte !");
        console.error(error);
      }
    }
  };

  return (
    <div className="container my-5">
      <h1>Mon compte</h1>
      <p>Bienvenue {user?.firstName} {user?.lastName}</p>

      <button className="btn btn-danger mt-3" onClick={handleDelete}>
        Supprimer mon compte
      </button>
    </div>
  );
}

export default Account;

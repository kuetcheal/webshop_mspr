import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css'; // Assurez-vous d'avoir ce fichier pour le style personnalisé

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1 className="not-found-title"> OUPS... Erreur 404</h1>
      <p className="not-found-message">La page que vous recherchez a été déplacée, effacée, renommée, ou n’a peut-être jamais existée.</p>
      <Link to="/" className="not-found-button">
        Retour à l'accueil
      </Link>
    </div>
  );
};

export default NotFound;

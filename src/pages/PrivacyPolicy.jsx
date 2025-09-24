import React from "react";
import "./PrivacyPolicy.css";

const PrivacyPolicy = () => {
  return (
    <div className="pp-container">
      <header className="pp-hero">
        <h1>Politique de confidentialité</h1>
        <p className="pp-meta">Dernière mise à jour : 24/09/2025</p>
      </header>

      <section>
        <p>
          La présente Politique de confidentialité explique comment <strong>Paye ton kawa</strong> (“nous”, “notre”, “nos”) collecte, utilise, conserve et protège vos données à caractère personnel lorsque vous utilisez notre site et nos services de e-commerce.
        </p>
        <p>
          Nous traitons vos données en conformité avec le Règlement (UE) 2016/679 (RGPD) et la loi Informatique et Libertés.
        </p>
      </section>

      <section>
        <h2>1. Responsable du traitement</h2>
        <p>
          Responsable : <strong>Paye ton kawa</strong><br />
          E-mail de contact : <a href="mailto:support@payetonkawa.com">support@payetonkawa.com</a><br />
          Délégué(e) à la protection des données (DPO) : <em>à compléter</em> (<a href="mailto:dpo@payetonkawa.com">dpo@payetonkawa.com</a>)
        </p>
      </section>

      <section>
        <h2>2. Données que nous collectons</h2>
        <ul>
          <li><strong>Compte & commande :</strong> nom, prénom, e-mail, adresse, téléphone, contenu du panier, historique d’achats.</li>
          <li><strong>Paiement :</strong> identifiants de transaction fournis par le prestataire (nous ne stockons jamais vos numéros de carte).</li>
          <li><strong>Support :</strong> messages échangés, pièces jointes éventuelles.</li>
          <li><strong>Navigation :</strong> cookies nécessaires, mesures d’audience, préférences (avec votre consentement).</li>
        </ul>
      </section>

      <section>
        <h2>3. Finalités & bases légales</h2>
        <ul className="pp-list">
          <li><strong>Exécution du contrat :</strong> création de compte, traitement des commandes, livraison, service client.</li>
          <li><strong>Intérêt légitime :</strong> prévention des fraudes, amélioration du site, sécurité.</li>
          <li><strong>Obligation légale :</strong> facturation, comptabilité, lutte contre la fraude.</li>
          <li><strong>Consentement :</strong> newsletter, cookies non essentiels, personnalisation marketing. Vous pouvez retirer votre consentement à tout moment.</li>
        </ul>
      </section>

      <section>
        <h2>4. Cookies & traceurs</h2>
        <p>
          Lors de votre première visite, une fenêtre de consentement vous permet d’accepter ou de refuser les cookies non essentiels. Vous pouvez à tout moment modifier votre choix via le lien « Gérer mes cookies » dans le pied de page (à ajouter) ou en effaçant les cookies du navigateur.
        </p>

        <div className="pp-table-wrap">
          <table className="pp-table">
            <thead>
              <tr>
                <th>Catégorie</th>
                <th>Exemples</th>
                <th>Finalité</th>
                <th>Durée</th>
                <th>Base légale</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Nécessaires</td>
                <td>session_id, panier</td>
                <td>Fonctionnement du site, panier, authentification</td>
                <td>Session à 12 mois</td>
                <td>Intérêt légitime / Exécution</td>
              </tr>
              <tr>
                <td>Mesure d’audience</td>
                <td>statistiques</td>
                <td>Mesurer l’utilisation du site</td>
                <td>13 mois max</td>
                <td>Consentement (si non exempté)</td>
              </tr>
              <tr>
                <td>Marketing</td>
                <td>remarketing</td>
                <td>Offres personnalisées</td>
                <td>13 mois max</td>
                <td>Consentement</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="pp-note">
          Astuce : vous pouvez aussi gérer les cookies via les paramètres de votre navigateur (Chrome, Firefox, Edge, etc.).
        </p>
      </section>

      <section>
        <h2>5. Newsletter</h2>
        <p>
          Si vous vous abonnez, nous utilisons uniquement votre e-mail pour vous envoyer des actualités et offres. Vous pouvez vous désabonner à tout moment via le lien de désinscription présent dans chaque e-mail.
        </p>
      </section>

      <section>
        <h2>6. Paiements</h2>
        <p>
          Les paiements sont traités par un prestataire certifié (ex. Stripe/PayPal). Nous ne stockons pas les données complètes de carte. Nous conservons uniquement des identifiants de transaction et les montants pour la comptabilité et la preuve d’achat.
        </p>
      </section>

      <section>
        <h2>7. Destinataires et sous-traitants</h2>
        <p>
          Vos données peuvent être transmises à nos prestataires strictement nécessaires : hébergement, paiement, livraison, e-mailing, analytique. Nous signons des accords de traitement conformes au RGPD.
        </p>
      </section>

      <section>
        <h2>8. Transferts hors UE</h2>
        <p>
          En cas de transfert vers un pays tiers, nous utilisons un mécanisme reconnu (décision d’adéquation, clauses contractuelles types, mesures complémentaires si nécessaire).
        </p>
      </section>

      <section>
        <h2>9. Sécurité</h2>
        <ul>
          <li>Chiffrement TLS en transit.</li>
          <li>Chiffrement/segmentation côté prestataire de paiement.</li>
          <li>Gestion des accès et authentification.</li>
          <li>Journalisation et sauvegardes.</li>
        </ul>
      </section>

      <section>
        <h2>10. Durées de conservation</h2>
        <ul>
          <li><strong>Compte inactif :</strong> suppression ou anonymisation après 12 mois d’inactivité (hors obligations légales).</li>
          <li><strong>Commandes/facturation :</strong> conservation légale (généralement 5 à 10 ans selon la législation locale).</li>
          <li><strong>Support :</strong> 24 mois après clôture du ticket.</li>
          <li><strong>Cookies non essentiels :</strong> 13 mois maximum.</li>
        </ul>
      </section>

      <section>
        <h2>11. Vos droits</h2>
        <p>
          Vous disposez des droits d’accès, rectification, effacement, limitation, opposition, portabilité, et du droit de définir des directives post-mortem. Pour exercer vos droits : <a href="mailto:dpo@payetonkawa.com">dpo@payetonkawa.com</a>.
        </p>
        <p>
          Si vous estimez que vos droits ne sont pas respectés, vous pouvez saisir l’autorité de contrôle compétente (ex. CNIL en France).
        </p>
      </section>

      <section>
        <h2>12. Mineurs</h2>
        <p>
          Nos services ne visent pas les enfants de moins de 15 ans. Si un parent pense que des données d’un mineur ont été collectées, contactez-nous pour suppression.
        </p>
      </section>

      <section>
        <h2>13. Modifications</h2>
        <p>
          Nous pouvons mettre à jour cette politique. La date en en-tête reflète la dernière version. En cas de changement majeur, une notification sera affichée sur le site.
        </p>
      </section>

      <footer className="pp-footer">
        <button
          className="pp-btn"
          onClick={() => {
            // Option utile : rouvrir la popup de consentement
            localStorage.removeItem("consent");
            window.location.reload();
          }}
        >
          Réinitialiser mon consentement cookies
        </button>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;

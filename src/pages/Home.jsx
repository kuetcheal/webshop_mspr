// src/pages/Home.jsx
import "./Home.css";
import Affiche from "@/components/common/affiche"; 

export default function Home() {
  return (
    <>
      <section className="hero hero--bg">
        <div className="hero__inner">
          <div className="hero__text">
            <h1 className="hero__kicker">Top arrivage.</h1>
            <h2 className="hero__title">La collection de la nouvelle année</h2>
            <p className="hero__subtitle">
              Notre dernière collection est là. Découvrez les tendances et les styles
              pour bien commencer l’année.
            </p>
            <a className="hero__cta" href="/Products">Acheter maintenant</a>
          </div>
        </div>
      </section>

      {/* Section icônes + textes */}
      <Affiche />
    </>
  );
}

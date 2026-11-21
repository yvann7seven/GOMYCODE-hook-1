import React from "react";
import { ArrowLeft, Clapperboard, Plus } from "lucide-react";

export default function AppHeader({ detailView, accent, onHome, onAdd }) {
  return (
    <header className="topbar">
      <div className="topbar__inner">
        <button className="brand" type="button" onClick={onHome} aria-label="Retour à l’accueil">
          <span className="brand__mark" style={{ boxShadow: `0 0 28px ${accent}55` }}>
            <Clapperboard size={20} />
          </span>
          <span>
            <strong>Cinéma Lumina</strong>
            <small>Collection & bandes-annonces</small>
          </span>
        </button>
        <div className="topbar__actions">
          {detailView && (
            <button className="button button--ghost topbar__back" type="button" onClick={onHome}>
              <ArrowLeft size={15} /> Accueil
            </button>
          )}
          <button className="button button--primary" type="button" onClick={onAdd}>
            <Plus size={16} /> Ajouter un film
          </button>
        </div>
      </div>
    </header>
  );
}

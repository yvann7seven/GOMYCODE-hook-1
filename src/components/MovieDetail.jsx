import React, { useRef, useState } from "react";
import { ArrowLeft, Calendar, Clock, ExternalLink, Lightbulb, Play, Star, User } from "lucide-react";

export default function MovieDetail({ movie, onHome, onSelect }) {
  const trailerRef = useRef(null);
  const [lightsOff, setLightsOff] = useState(false);
  if (!movie) return null;

  return (
    <div className="detail" style={{ "--detail-accent": movie.accent || "#d3ef75" }}>
      <button className="detail__back" type="button" onClick={onHome}>
        <ArrowLeft size={16} /> Retour à l’accueil
      </button>

      <section className="detail__hero">
        <img className="detail__backdrop" src={movie.backdrop || movie.poster} alt="" />
        <span className="detail__veil" />
        <div className="detail__grid">
          <img className="detail__poster" src={movie.poster} alt={`Affiche de ${movie.title}`} />
          <div className="detail__copy">
            <span className="detail__genre">{movie.genre}</span>
            <h1>{movie.title}</h1>
            <div className="detail__rating">
              <Star size={16} fill="currentColor" /> {movie.rating}/5
              <span>·</span>
              {movie.year}
              <span>·</span>
              {movie.duration}
            </div>
            <p>{movie.description}</p>
            <div className="detail__meta">
              <span><User size={15} /> {movie.director}</span>
              <span><Calendar size={15} /> {movie.year}</span>
              <span><Clock size={15} /> {movie.duration}</span>
            </div>
            <div className="detail__actions">
              <button className="button button--primary" type="button" onClick={() => trailerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })}>
                <Play size={16} fill="currentColor" /> Voir la bande-annonce
              </button>
              {movie.trailer && (
                <a className="button button--ghost" href={movie.trailer.replace("/embed/", "/watch?v=")} target="_blank" rel="noreferrer">
                  <ExternalLink size={15} /> YouTube
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {movie.trailer && (
        <section ref={trailerRef} className={`trailer ${lightsOff ? "trailer--dark" : ""}`}>
          <div className="trailer__heading">
            <div>
              <span className="eyebrow">Bande-annonce officielle</span>
              <h2>{movie.title}</h2>
            </div>
            <button className="button button--ghost" type="button" onClick={() => setLightsOff((value) => !value)}>
              <Lightbulb size={15} /> {lightsOff ? "Rallumer" : "Mode cinéma"}
            </button>
          </div>
          <div className="trailer__frame">
            <iframe src={`${movie.trailer}?rel=0&modestbranding=1`} title={`Bande-annonce de ${movie.title}`} allowFullScreen />
          </div>
        </section>
      )}
    </div>
  );
}

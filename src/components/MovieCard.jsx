import React from "react";
import { ChevronRight, Pencil, Play, Star, Trash2 } from "lucide-react";

export default function MovieCard({ movie, onEdit, onDelete }) {
  return (
    <article className="movie-card" style={{ "--card-accent": movie.accent || "#d3ef75" }}>
      <button className="movie-card__poster-wrap" type="button" onClick={() => onEdit(movie, true)} aria-label={`Voir ${movie.title}`}>
        <img
          className="movie-card__poster"
          src={movie.poster}
          alt={`Affiche de ${movie.title}`}
          loading="lazy"
        />
        <span className="movie-card__shade" />
        <span className="movie-card__rating">
          <Star size={14} fill="currentColor" aria-hidden="true" />
          {movie.rating}/5
        </span>
        <span className="movie-card__play"><Play size={19} fill="currentColor" /></span>
      </button>
      <div className="movie-card__content">
        <div>
          <span className="movie-card__meta">{movie.year} · {movie.genre}</span>
          <h3>{movie.title}</h3>
        </div>
        <div className="movie-card__actions">
          <button className="icon-button" type="button" onClick={() => onEdit(movie)} aria-label={`Modifier ${movie.title}`} title="Modifier">
            <Pencil size={15} aria-hidden="true" />
          </button>
          <button className="icon-button icon-button--delete" type="button" onClick={() => onDelete(movie.id)} aria-label={`Supprimer ${movie.title}`} title="Supprimer">
            <Trash2 size={15} aria-hidden="true" />
          </button>
        </div>
      </div>
      <button className="movie-card__details" type="button" onClick={() => onEdit(movie, true)}>
        Voir les détails <ChevronRight size={14} />
      </button>
    </article>
  );
}

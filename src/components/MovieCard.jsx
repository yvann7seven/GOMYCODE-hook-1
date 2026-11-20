import React from "react";
import { Pencil, Star, Trash2 } from "lucide-react";

export default function MovieCard({ movie, onEdit, onDelete }) {
  return (
    <article className="movie-card">
      <div className="movie-card__poster-wrap">
        <img
          className="movie-card__poster"
          src={movie.poster}
          alt={`Affiche de ${movie.title}`}
          loading="lazy"
        />
        <span className="movie-card__rating">
          <Star size={14} fill="currentColor" aria-hidden="true" />
          {movie.rating}/5
        </span>
        <div className="movie-card__actions">
          <button
            className="icon-button"
            type="button"
            onClick={() => onEdit(movie)}
            aria-label={`Modifier ${movie.title}`}
            title="Modifier"
          >
            <Pencil size={16} aria-hidden="true" />
          </button>
          <button
            className="icon-button icon-button--delete"
            type="button"
            onClick={() => onDelete(movie.id)}
            aria-label={`Supprimer ${movie.title}`}
            title="Supprimer"
          >
            <Trash2 size={16} aria-hidden="true" />
          </button>
        </div>
      </div>
      <div className="movie-card__content">
        <h3>{movie.title}</h3>
        <p>{movie.description}</p>
      </div>
    </article>
  );
}

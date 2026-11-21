import React from "react";
import { Clapperboard, Plus } from "lucide-react";
import MovieCard from "./MovieCard.jsx";

export default function MovieList({ movies, onEdit, onDelete }) {
  if (movies.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-state__icon">
          <Clapperboard size={28} aria-hidden="true" />
        </span>
        <h3>Aucun film trouvé</h3>
        <p>Essayez un autre filtre ou ajoutez un titre à votre collection.</p>
      </div>
    );
  }

  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

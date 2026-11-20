import React from "react";
import { Search, SlidersHorizontal, Star } from "lucide-react";

export default function MovieFilters({
  title,
  rating,
  onTitleChange,
  onRatingChange,
}) {
  return (
    <div className="filters">
      <label className="search-field">
        <Search size={18} aria-hidden="true" />
        <span className="sr-only">Rechercher un film par titre</span>
        <input
          type="search"
          placeholder="Rechercher un film..."
          value={title}
          onChange={(event) => onTitleChange(event.target.value)}
        />
      </label>
      <label className="rating-filter">
        <SlidersHorizontal size={17} aria-hidden="true" />
        <span className="sr-only">Filtrer par note minimum</span>
        <select
          value={rating}
          onChange={(event) => onRatingChange(event.target.value)}
        >
          <option value="0">Toutes les notes</option>
          <option value="1">1 étoile et plus</option>
          <option value="2">2 étoiles et plus</option>
          <option value="3">3 étoiles et plus</option>
          <option value="4">4 étoiles et plus</option>
          <option value="5">5 étoiles</option>
        </select>
        <Star size={15} className="rating-filter__star" aria-hidden="true" />
      </label>
    </div>
  );
}

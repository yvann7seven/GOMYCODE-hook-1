import React, { useEffect, useState } from "react";
import { ImagePlus, Plus, Save, X } from "lucide-react";

const emptyMovie = {
  title: "",
  description: "",
  poster: "",
  backdrop: "",
  rating: "4",
  year: "2026",
  duration: "1h 45min",
  genre: "Drame",
  director: "",
  trailer: "",
};

export default function MovieForm({ movie, onSave, onCancel }) {
  const [form, setForm] = useState(emptyMovie);

  useEffect(() => {
    setForm(
      movie
        ? {
            title: movie.title,
            description: movie.description,
            poster: movie.poster,
        backdrop: movie.backdrop || movie.poster,
            rating: String(movie.rating),
        year: String(movie.year || ""),
        duration: movie.duration || "",
        genre: movie.genre || "Drame",
        director: movie.director || "",
        trailer: movie.trailer || "",
          }
        : emptyMovie,
    );
  }, [movie]);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSave({
      ...form,
      title: form.title.trim(),
      description: form.description.trim(),
      poster: form.poster.trim(),
      rating: Number(form.rating),
    });
  }

  return (
    <form className="movie-form" onSubmit={handleSubmit}>
      <div className="form-heading">
        <div>
          <span className="eyebrow">{movie ? "VOTRE COLLECTION" : "NOUVEAU TITRE"}</span>
          <h2>{movie ? "Modifier le film" : "Ajouter un film"}</h2>
        </div>
        <button
          className="icon-button form-close"
          type="button"
          onClick={onCancel}
          aria-label="Fermer le formulaire"
        >
          <X size={18} aria-hidden="true" />
        </button>
      </div>

      <label className="form-label">
        Titre
        <input
          autoFocus
          name="title"
          value={form.title}
          onChange={updateField}
          placeholder="Ex. Le fabuleux destin..."
          maxLength={80}
          required
        />
      </label>

      <label className="form-label">
        Description
        <textarea
          name="description"
          value={form.description}
          onChange={updateField}
          placeholder="Quelques mots sur ce film..."
          rows={3}
          maxLength={240}
          required
        />
      </label>

      <label className="form-label">
        URL de l'affiche
        <span className="input-with-icon">
          <ImagePlus size={16} aria-hidden="true" />
          <input
            type="url"
            name="poster"
            value={form.poster}
            onChange={updateField}
            placeholder="https://exemple.com/affiche.jpg"
            required
          />
        </span>
      </label>

      <label className="form-label">
        Votre note
        <select name="rating" value={form.rating} onChange={updateField}>
          <option value="1">1 étoile — À éviter</option>
          <option value="2">2 étoiles — Bof</option>
          <option value="3">3 étoiles — Pas mal</option>
          <option value="4">4 étoiles — Excellent</option>
          <option value="5">5 étoiles — Chef-d'œuvre</option>
        </select>
      </label>

      <div className="form-actions">
        <button className="button button--quiet" type="button" onClick={onCancel}>
          Annuler
        </button>
        <button className="button button--primary" type="submit">
          {movie ? <Save size={16} /> : <Plus size={17} />}
          {movie ? "Enregistrer" : "Ajouter le film"}
        </button>
      </div>
    </form>
  );
}

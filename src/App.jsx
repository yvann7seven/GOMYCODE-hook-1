import React, { useEffect, useMemo, useState } from "react";
import { Film, Plus, Sparkles } from "lucide-react";
import MovieFilters from "./components/MovieFilters.jsx";
import MovieForm from "./components/MovieForm.jsx";
import MovieList from "./components/MovieList.jsx";
import { starterMovies } from "./data/movies.js";

const STORAGE_KEY = "cineclub-movies";

function readMovies() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === null) return starterMovies;
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : starterMovies;
  } catch (error) {
    console.error("Impossible de charger la collection depuis le stockage local.", error);
    return starterMovies;
  }
}

export default function App() {
  const [movies, setMovies] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchTitle, setSearchTitle] = useState("");
  const [filterRating, setFilterRating] = useState("0");
  const [editingMovie, setEditingMovie] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    setMovies(readMovies());
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(movies));
    } catch (error) {
      console.error("Impossible d'enregistrer la collection dans le stockage local.", error);
    }
  }, [isLoaded, movies]);

  const filteredMovies = useMemo(() => {
    const query = searchTitle.trim().toLocaleLowerCase("fr");
    const minimumRating = Number(filterRating);
    return movies.filter(
      (movie) =>
        movie.title.toLocaleLowerCase("fr").includes(query) &&
        movie.rating >= minimumRating,
    );
  }, [movies, searchTitle, filterRating]);

  function openAddForm() {
    setEditingMovie(null);
    setIsFormOpen(true);
  }

  function openEditForm(movie) {
    setEditingMovie(movie);
    setIsFormOpen(true);
  }

  function closeForm() {
    setIsFormOpen(false);
    setEditingMovie(null);
  }

  function saveMovie(values) {
    if (editingMovie) {
      setMovies((current) =>
        current.map((movie) =>
          movie.id === editingMovie.id ? { ...movie, ...values } : movie,
        ),
      );
    } else {
      setMovies((current) => [{ ...values, id: crypto.randomUUID() }, ...current]);
    }
    closeForm();
  }

  function deleteMovie(id) {
    setMovies((current) => current.filter((movie) => movie.id !== id));
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#" aria-label="Cinéclub, accueil">
          <span className="brand__icon">
            <Film size={19} aria-hidden="true" />
          </span>
          <span>cinéclub<span className="brand__dot">.</span></span>
        </a>
        <span className="topbar__tagline">VOTRE PETIT CINÉMA PERSONNEL</span>
        <button className="button button--primary topbar__add" onClick={openAddForm}>
          <Plus size={17} aria-hidden="true" />
          <span>Ajouter un film</span>
        </button>
      </header>

      <main>
        <section className="hero">
          <div className="hero__copy">
            <span className="eyebrow"><Sparkles size={14} /> LA SÉANCE COMMENCE</span>
            <h1>Les histoires<br />qu'on <em>garde.</em></h1>
            <p>Rassemblez vos films préférés au même endroit.<br />Une collection à votre image, pour les revoir encore.</p>
          </div>
          <div className="hero__art" aria-hidden="true">
            <div className="hero__orb" />
            <div className="hero__ticket"><Film size={38} /><span>BONNE<br />SÉANCE</span></div>
            <span className="hero__spark hero__spark--one">✳</span>
            <span className="hero__spark hero__spark--two">✦</span>
          </div>
        </section>

        <section className="collection" aria-labelledby="collection-title">
          <div className="collection__heading">
            <div>
              <span className="eyebrow">LE CATALOGUE</span>
              <h2 id="collection-title">Ma collection <span>{movies.length}</span></h2>
            </div>
            <MovieFilters
              title={searchTitle}
              rating={filterRating}
              onTitleChange={setSearchTitle}
              onRatingChange={setFilterRating}
            />
          </div>

          {isFormOpen && (
            <div className="form-backdrop" onMouseDown={(event) => {
              if (event.target === event.currentTarget) closeForm();
            }}>
              <MovieForm
                movie={editingMovie}
                onSave={saveMovie}
                onCancel={closeForm}
              />
            </div>
          )}

          <MovieList
            movies={filteredMovies}
            onEdit={openEditForm}
            onDelete={deleteMovie}
          />
        </section>
      </main>

      <footer className="footer">
        <span>FAIT AVEC GOÛT, À REGARDER SANS MODÉRATION.</span>
        <span>© CINÉCLUB</span>
      </footer>
    </div>
  );
}

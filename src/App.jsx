import React, { useEffect, useMemo, useState } from "react";
import { Film, Search, SlidersHorizontal, Sparkles, Star } from "lucide-react";
import AppHeader from "./components/AppHeader.jsx";
import MovieFilters from "./components/MovieFilters.jsx";
import MovieForm from "./components/MovieForm.jsx";
import MovieList from "./components/MovieList.jsx";
import MovieDetail from "./components/MovieDetail.jsx";
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
  const [detailId, setDetailId] = useState(null);

  useEffect(() => {
    function syncRoute() {
      const match = window.location.hash.match(/^#\/movie\/(.+)$/);
      setDetailId(match ? decodeURIComponent(match[1]) : null);
    }
    syncRoute();
    window.addEventListener("hashchange", syncRoute);
    return () => window.removeEventListener("hashchange", syncRoute);
  }, []);

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

  function openMovie(movie) {
    window.location.hash = `/movie/${encodeURIComponent(movie.id)}`;
  }

  function closeForm() {
    setIsFormOpen(false);
    setEditingMovie(null);
  }

  function saveMovie(values) {
    if (editingMovie) {
      setMovies((current) =>
        current.map((movie) =>
          movie.id === editingMovie.id
            ? { ...movie, ...values, rating: Number(values.rating), year: Number(values.year) || movie.year }
            : movie,
        ),
      );
    } else {
      setMovies((current) => [{
        ...values,
        id: crypto.randomUUID(),
        accent: "#d3ef75",
        rating: Number(values.rating),
        year: Number(values.year) || new Date().getFullYear(),
        backdrop: values.backdrop || values.poster,
      }, ...current]);
    }
    closeForm();
  }

  function deleteMovie(id) {
    setMovies((current) => current.filter((movie) => movie.id !== id));
  }

  function handleMovieAction(movie, openDetail = false) {
    if (openDetail) openMovie(movie);
    else openEditForm(movie);
  }

  function goHome() {
    window.location.hash = "/";
  }

  const activeMovie = detailId
    ? movies.find((movie) => String(movie.id) === String(detailId))
    : null;
  const accent = activeMovie?.accent || "#d3ef75";

  return (
    <div className="app-shell" style={{ "--ambient-accent": accent }}>
      <AppHeader detailView={Boolean(detailId)} accent={accent} onHome={goHome} onAdd={openAddForm} />
      <main className="main">
        {detailId ? (
          <MovieDetail movie={activeMovie} onHome={goHome} />
        ) : (
          <>
            <section className="hero">
              <div className="hero__copy">
                <span className="eyebrow"><Sparkles size={14} /> LA SÉANCE COMMENCE</span>
                <h1>Les histoires<br />qu’on <em>garde.</em></h1>
                <p>Une collection personnelle, des univers à explorer<br />et les plus belles bandes-annonces réunies ici.</p>
                <button className="button button--primary hero__button" type="button" onClick={() => openMovie(movies[0])}>
                  <Film size={16} /> Découvrir la sélection
                </button>
              </div>
              <div className="hero__visual" aria-hidden="true">
                <img src={movies[0]?.backdrop || movies[0]?.poster} alt="" />
                <span className="hero__visual-glow" />
                <span className="hero__visual-label">Séance du jour</span>
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
              <MovieList
                movies={filteredMovies}
                onEdit={handleMovieAction}
                onDelete={deleteMovie}
              />
            </section>
          </>
        )}
      </main>

      {isFormOpen && (
        <div className="form-backdrop" onMouseDown={(event) => {
          if (event.target === event.currentTarget) closeForm();
        }}>
          <MovieForm movie={editingMovie} onSave={saveMovie} onCancel={closeForm} />
        </div>
      )}

      <footer className="footer">
        <span><Film size={14} /> CINÉMA LUMINA · EXPÉRIENCE INTERACTIVE</span>
        <span>{movies.length} œuvres disponibles</span>
      </footer>
    </div>
  );
}

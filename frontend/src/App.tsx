import { useEffect, useState } from "react";
import "./App.css";

interface Movie {
  id: number;
  title: string;
  year: number;
  genre: string;
  rating: number;
}

const emptyForm = { title: "", year: "", genre: "", rating: "" };

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filter, setFilter] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  const fetchMovies = () => {
    fetch("http://localhost:3000/api/movies")
      .then((res) => res.json())
      .then((data) => setMovies(data));
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch("http://localhost:3000/api/movies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: form.title,
        year: Number(form.year),
        genre: form.genre,
        rating: Number(form.rating),
      }),
    }).then((res) => {
      if (!res.ok) {
        setError("Missing required fields.");
        return;
      }
      res.json().then((newMovie) => {
        setMovies((prev) => [...prev, newMovie]);
        setForm(emptyForm);
        setError("");
      });
    });
  };

  const filteredMovies = movies.filter(
    (m) =>
      m.title.toLowerCase().includes(filter.toLowerCase()) ||
      m.genre.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <h1>Movie List</h1>
      <input
        placeholder="Filter by title or genre..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          type="number"
          placeholder="Year"
          value={form.year}
          onChange={(e) => setForm({ ...form, year: e.target.value })}
        />
        <input
          placeholder="Genre"
          value={form.genre}
          onChange={(e) => setForm({ ...form, genre: e.target.value })}
        />
        <input
          type="number"
          step="0.1"
          placeholder="Rating"
          value={form.rating}
          onChange={(e) => setForm({ ...form, rating: e.target.value })}
        />
        <button type="submit">Add Movie</button>
        {error && <p>{error}</p>}
      </form>
      {filteredMovies.map((movie: Movie) => (
        <div key={movie.id}>
          <h2>{movie.title}</h2>
          <p>Year: {movie.year}</p>
          <p>Genre: {movie.genre}</p>
          <p>Rating: {movie.rating}</p>
        </div>
      ))}
    </>
  );
}

export default App;

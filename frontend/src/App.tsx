import { useEffect, useState } from "react";
import "./App.css";

interface Movie {
  id: number;
  title: string;
  year: number;
  genre: string;
  rating: number;
}

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);

  const fetchMovies = () => {
    fetch("http://localhost:3000/api/movies")
      .then((res) => res.json())
      .then((data) => setMovies(data));
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <>
      <h1>Movie List</h1>
      {movies.map((movie: Movie) => (
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

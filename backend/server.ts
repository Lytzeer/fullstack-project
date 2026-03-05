import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
const PORT = 3000;

const movies = [
  {
    id: 1,
    title: "Inception",
    year: 2010,
    genre: "Science-Fiction",
    rating: 8.8,
  },
  { id: 2, title: "The Dark Knight", year: 2008, genre: "Action", rating: 9.0 },
  {
    id: 3,
    title: "Interstellar",
    year: 2014,
    genre: "Science-Fiction",
    rating: 8.6,
  },
  { id: 4, title: "Pulp Fiction", year: 1994, genre: "Crime", rating: 8.9 },
  {
    id: 5,
    title: "The Matrix",
    year: 1999,
    genre: "Science-Fiction",
    rating: 8.7,
  },
];

app.get("/api/movies", (_req, res) => {
  res.json(movies);
});

app.get("/api/movies/:id", (req, res) => {
  const movie = movies.find((movie) => movie.id === parseInt(req.params.id));
  if (!movie) {
    res.status(404).json(null);
    return;
  }
  res.json(movie);
});

app.post("/api/movies", express.json(), (req, res) => {
  const { title, year, genre, rating } = req.body;
  if (!title || !year || !genre || !rating) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }
  const newMovie = {
    id: movies.length + 1,
    title,
    year,
    genre,
    rating,
  };
  movies.push(newMovie);
  res.status(201).json(newMovie);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

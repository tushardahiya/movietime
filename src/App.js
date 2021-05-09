import React, { useEffect, useState } from "react";
import Movie from "./components/Movie";

const FEATURED_API =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=1e3d27f0aefcf69a0745ea2244e98e1e&page=1";
const SEARCH_API =
  "https://api.themoviedb.org/3/search/movie?&api_key=1e3d27f0aefcf69a0745ea2244e98e1e&query=";

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(FEATURED_API)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMovies(data.results);
      });
  }, []);

  return (
    <div className="movie-container">
      {movies.length > 0 &&
        movies.map((movie) => <Movie key={movie.id} {...movie} />)}
    </div>
  );
}

export default App;

//API Key (v3 auth)
//1e3d27f0aefcf69a0745ea2244e98e1e

// example API request
// https://api.themoviedb.org/3/movie/550?api_key=1e3d27f0aefcf69a0745ea2244e98e1e

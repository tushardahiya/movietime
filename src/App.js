import React, { useEffect, useState } from "react";
import Details from "./components/Details";
import Movie from "./components/Movie";

const API_KEY = process.env.REACT_APP_API_KEY;

const FEATURED_API = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=1`;
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?&api_key=${API_KEY}&query=`;

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalId, setModalId] = useState("");

  const getMovies = (API) => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMovies(data.results);
      });
  };

  useEffect(() => {
    getMovies(FEATURED_API);
  }, []);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (searchTerm) {
      getMovies(SEARCH_API + searchTerm);
      setSearchTerm("");
    } else {
      getMovies(FEATURED_API);
    }
  };

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDetailModal = (id) => {
    console.log(id);
    setShowModal(!showModal);
    setModalId(id);
  };

  const hideModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <header>
        <div
          onClick={() => {
            getMovies(FEATURED_API);
          }}
        >
          <h3>Movie Time</h3>
        </div>
        <form onSubmit={handleOnSubmit}>
          <input
            className="search"
            type="search"
            placeholder="search..."
            value={searchTerm}
            onChange={handleOnChange}
          />
        </form>
      </header>
      <div className="movie-container">
        {movies.length > 0 &&
          movies.map((movie) => (
            <Movie
              key={movie.id}
              {...movie}
              handleClick={(id) => handleDetailModal(id)}
            />
          ))}
      </div>
      {showModal ? <Details id={modalId} closeModal={hideModal} /> : null}
    </>
  );
}

export default App;

//API Key (v3 auth)
//1e3d27f0aefcf69a0745ea2244e98e1e

// example API request
// https://api.themoviedb.org/3/movie/550?api_key=1e3d27f0aefcf69a0745ea2244e98e1e

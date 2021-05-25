import React, { useEffect, useState } from "react";
import Details from "./components/Details";
import Movie from "./components/Movie";
import { Route } from "react-router-dom";
import { useHistory, useLocation } from "react-router-dom";

const API_KEY = process.env.REACT_APP_API_KEY;

const FEATURED_API = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=1`;
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?&api_key=${API_KEY}&query=`;

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [modalId, setModalId] = useState("");
  const history = useHistory();
  const location = useLocation();

  const getMovies = (API) => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
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
    setModalId(id);
    history.push("/details");
  };

  const hideModal = () => {
    history.push("/");
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

      {modalId === "" && location.pathname === "/details" ? (
        history.push("/")
      ) : (
        <Route
          path="/details"
          render={() => <Details id={modalId} closeModal={hideModal} />}
        />
      )}

      {/* {showModal ? <Details id={modalId} closeModal={hideModal} /> : null} */}
    </>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import "./Details.css";

const API_KEY = process.env.REACT_APP_API_KEY;
const IMG_API = "https://image.tmdb.org/t/p/w1280";

const Details = ({ id, closeModal }) => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [movieCast, setMovieCast] = useState(null);

  const MOVIE_DETAIL_API = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`;
  const MOVIE_CAST_API = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`;

  useEffect(() => {
    fetch(MOVIE_DETAIL_API)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMovieDetails(data);
      });
    fetch(MOVIE_CAST_API)
      .then((res) => res.json())
      .then((cast) => {
        console.log(cast);
        setMovieCast(cast);
      });
  }, [id, MOVIE_DETAIL_API, MOVIE_CAST_API]);

  let background = null;
  if (movieDetails) {
    background = `url("${IMG_API}${movieDetails.backdrop_path}")`;
  }
  // overview , poster_path , release_date , runtime , tagline , genres(an array) , status , budget
  return (
    <div
      className="modal-container"
      style={{ backgroundImage: background }}
      onClick={closeModal}
    >
      <div className="modal">
        <h1>main section</h1>
      </div>
    </div>
  );
};

export default Details;

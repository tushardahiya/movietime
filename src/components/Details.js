import React, { useEffect, useState } from "react";
import fallbackimage from "../assets/image_not_found.png";
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
        setMovieDetails(data);
      });
    fetch(MOVIE_CAST_API)
      .then((res) => res.json())
      .then((cast) => {
        setMovieCast(cast);
      });
  }, [id, MOVIE_DETAIL_API, MOVIE_CAST_API]);

  let background = null;
  if (movieDetails) {
    background = `url("${IMG_API}${movieDetails.backdrop_path}")`;
  }
  //  release_date , runtime , , status , budget

  let status = "Not Released";
  if (movieDetails && movieDetails.status === "Released") {
    status = `Released on : ${movieDetails.release_date}`;
  }

  return (
    <>
      {movieDetails && movieCast ? (
        <div
          className="modal-container"
          style={{
            backgroundImage: background,
            backgroundSize: "cover",
          }}
          onClick={closeModal}
        >
          <div className="modal">
            <div className="main-section">
              <img
                src={
                  movieDetails.poster_path
                    ? IMG_API + movieDetails.poster_path
                    : fallbackimage
                }
                alt="404 poster not found"
              />
              <div>
                <h1>{movieDetails.title}</h1>
                <h4>{movieDetails.tagline}</h4>
                <div className="genre">
                  {movieDetails.genres.map((genre) => (
                    <h5 key={genre.id}>{genre.name}</h5>
                  ))}
                </div>
                <h4>{status}</h4>
              </div>
            </div>
            <div className="overview-container">
              <h2>Overview</h2>
              <p>{movieDetails.overview}</p>
            </div>
            <h2 className="cast-heading">Cast</h2>
            <div className="cast-container">
              {movieCast.cast.slice(0, 10).map((el) => (
                <div key={el.id} className="cast-card">
                  <img
                    className="cast-image"
                    src={`${IMG_API}${el.profile_path}`}
                    alt="cast"
                  />
                  <h4>{el.name}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Details;

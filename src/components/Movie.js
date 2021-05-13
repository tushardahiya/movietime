import React from "react";
import fallbackimage from "../assets/image_not_found.png";

const IMG_API = "https://image.tmdb.org/t/p/w1280";

const setVoteClass = (vote) => {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 6) {
    return "orange";
  } else {
    return "red";
  }
};

const Movie = ({
  title,
  poster_path,
  overview,
  vote_average,
  id,
  handleClick,
}) => {
  return (
    <div className="movie" onClick={() => handleClick(id)}>
      <img
        src={poster_path ? IMG_API + poster_path : fallbackimage}
        alt="404 poster not found"
      />
      <div className="movie-info">
        <h3>{title}</h3>
        <span className={`tag ${setVoteClass(vote_average)}`}>
          {vote_average}
        </span>
      </div>
      <div className="movie-overview ">
        <h2>Overview :</h2>
        <p>{overview}</p>
        <h2>CLICK FOR MORE INFO</h2>
      </div>
    </div>
  );
};

export default Movie;

import { useEffect, useRef, useState } from "react";
import StarRating from "./StarRating";
import Loader from "./Loader";
import { useKey } from "../hooks/useKey";

const key = "5a204103";
const url = `http://www.omdbapi.com/?apikey=${key}&`;

export default function MovieDetails({
  selectedId,
  onCloseMovie,
  onAddWatched,
  watched,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [movie, setMovie] = useState({});
  const [rating, setRating] = useState(0);
  useKey(onCloseMovie, "Escape");

  const countRef = useRef(0);

  useEffect(
    function () {
      if (rating) countRef.current += 1;
    },
    [rating]
  );

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating: rating,
      countRatingDecisions: countRef.current,
    };
    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }

  // useEffect(
  //   function () {
  //     function keyDownCallback(e) {
  //       if (e.code === "Escape") {
  //         onCloseMovie();
  //       }
  //     }

  //     document.addEventListener("keydown", keyDownCallback);

  //     return function () {
  //       document.removeEventListener("keydown", keyDownCallback);
  //     };
  //   },
  //   [onCloseMovie]
  // );

  useEffect(
    function () {
      async function fetchMovieDetails() {
        setIsLoading(true);
        try {
          const response = await fetch(`${url}i=${selectedId}`);

          const data = await response.json();

          setMovie(data);
        } catch (e) {
        } finally {
          setIsLoading(false);
        }
      }

      fetchMovieDetails();
    },
    [selectedId]
  );

  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;

      return function () {
        document.title = "usePopcorn";
      };
    },

    [title]
  );

  if (isLoading) return <Loader />;

  return (
    <div className="details">
      <header>
        <img src={poster} alt={`Poster of ${movie}`} />
        <div className="details-overview">
          <h2>{title}</h2>
          <p>
            {released} &bull; {runtime}
          </p>
          <p>{genre}</p>
          <p>
            <span>⭐️</span>
            {imdbRating} IMDb rating
          </p>
        </div>
        <button className="btn-back" onClick={onCloseMovie}>
          &larr;
        </button>
      </header>
      <section>
        <div className="rating">
          {!isWatched ? (
            <>
              <StarRating maxRating={10} size={24} onSetRating={setRating} />
              {rating > 0 && (
                <button
                  className="btn-add"
                  onClick={handleAdd}
                  disabled={isWatched}
                >
                  + Add to list
                </button>
              )}
            </>
          ) : (
            <p>
              You rated this movie {watchedUserRating} <span>⭐️</span>
            </p>
          )}
        </div>
        <p>
          <em>{plot}</em>
        </p>
        <p>Starring {actors}</p>
        <p>Directed by {director}</p>
      </section>
    </div>
  );
}

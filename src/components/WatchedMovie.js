export default function WatchedMovie({ movie, onRemoveWatchedMovie }) {
  function handleRemoveWatchMovie() {
    onRemoveWatchedMovie(movie.imdbID);
  }

  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
      </div>
      <button className="btn-delete" onClick={handleRemoveWatchMovie}>
        X
      </button>
    </li>
  );
}

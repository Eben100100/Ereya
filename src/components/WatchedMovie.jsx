function WatchedMovie({ movie, handleWatchedDelete }) {
  const handleDelete = (id) => {
    handleWatchedDelete(id);
  };
  return (
    <li key={movie.imdbID}>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.Title}</h3>
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
          <button
            className="btn-delete"
            onClick={() => handleDelete(movie.imdbID)}
          >
            X
          </button>
        </p>
      </div>
    </li>
  );
}

export default WatchedMovie;

import WatchedMovie from "./WatchedMovie";

function WatchedMovieList({ watched, handleWatchedDelete }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie movie={movie} handleWatchedDelete={handleWatchedDelete} />
      ))}
    </ul>
  );
}

export default WatchedMovieList;

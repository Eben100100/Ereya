import Movie from "./Movie";

function MovieList({ movies, handleSelectedMovies }) {
  return (
    <ul className="list">
      {movies?.map((movie) => (
        <Movie movie={movie} handleSelectedMovies={handleSelectedMovies} />
      ))}
    </ul>
  );
}

export default MovieList;

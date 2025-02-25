import { useEffect, useState } from "react";
import ErrorMessage from "./ErrorMessage";
import Spinner from "./Spinner";
import StarRating from "./StarRating";

function SelectedMovie({
  selectedId,
  setSelectedId,
  handleCloseMovies,
  handleAddWatched,
  watched,
}) {
  const [isLoading, setIsLoading] = useState("");
  const [error, setError] = useState(false);
  const [movieDetails, setMovieDetails] = useState({});
  const [userRating, setUserRating] = useState("");

  const {
    Year: year,
    Title: title,
    Actors: actors,
    Poster: poster,
    Runtime: runtime,
    Released: released,

    imdbRating,
    Director: director,
    Genre: genre,
    Plot: plot,
  } = movieDetails;

  useEffect(() => {
    const getDetails = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=902cdd1d&i=${selectedId}`
        );
        if (!res.ok)
          throw new Error("can't not load data, some went wrong thing");
        const data = await res.json();
        setMovieDetails(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    getDetails();
  }, [selectedId]);

  useEffect(() => {
    if (!title) return;
    document.title = title;

    return () => {
      document.title = "Ereya";
    };
  }, [title]);
  // useEffect(    document.addEventListener("  Keydown" , (

  const handleClick = () => {
    const newWatchedMovies = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
      Director: director,
    };
    handleAddWatched(newWatchedMovies);
    setSelectedId(null);
  };

  const hasItBeignWatched = watched
    .map((movie) => movie.imdbID)
    .includes(selectedId);

  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  return (
    <>
      {isLoading && <Spinner />}
      {error && <ErrorMessage message={error} />}
      {!error && !isLoading && (
        <div className="details">
          <header>
            <button className="btn-back" onClick={handleCloseMovies}>
              &larr;
            </button>

            <img src={poster} alt={`poster of ${poster}`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {" "}
                {released} &bull; {runtime}{" "}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDB rating
              </p>
            </div>
          </header>
          <section>
            {!hasItBeignWatched ? (
              <div className="rating">
                <StarRating
                  maxRating={10}
                  size="24px"
                  onSetRating={setUserRating}
                />
                {userRating && (
                  <button className="btn-add" onClick={() => handleClick()}>
                    +Add to List
                  </button>
                )}
              </div>
            ) : (
              <p>
                Dude you rated the movie already, you gave it{" "}
                <span
                  style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    color: "#cff419",
                  }}
                >
                  {" "}
                  {watchedUserRating}⭐
                </span>
              </p>
            )}
            <p>
              <em>{plot}</em>{" "}
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </div>
      )}
    </>
  );
}

export default SelectedMovie;

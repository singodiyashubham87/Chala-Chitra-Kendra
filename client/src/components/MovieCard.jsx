import { useMovies } from "../context/MoviesContext";

/* eslint-disable react/prop-types */
const MovieCard = ({movie}) => {
  const { handleFavorite, favorites } = useMovies();
  return (
    <div className="movie-card border-2 border-black bg-slate-400 flex flex-col gap-4 p-2 rounded-md">
      <div className="border-2 border-black w-52 h-24 vvsm:w-72 vvsm:h-44 overflow-hidden rounded-lg">
        <img
          src={
            movie?.poster_path
              ? import.meta.env.VITE_TMDB_IMAGE_BASE_URL + movie?.poster_path
              : "https://m.media-amazon.com/images/I/61s8vyZLSzL._AC_UF894,1000_QL80_.jpg"
          }
          alt="poster"
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="flex w-52 vvsm:w-72 justify-between items-center text-slate-900">
        <div className="flex flex-col justify-center w-[85%]">
          <h1 title={movie.title}>
            <strong>Name:</strong> {movie?.title}
          </h1>
          <h3>
            <strong>Release Year:</strong> {movie?.release_date?.split("-")[0]}
          </h3>
        </div>
        <button onClick={(e) => handleFavorite(e, movie)} className="text-[2rem]">
          {favorites ? (favorites.includes(movie.id) ? "★" : "☆") : "☆"}
        </button>
      </div>
    </div>
  );
};

export default MovieCard;

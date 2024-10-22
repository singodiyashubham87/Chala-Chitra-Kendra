/* eslint-disable react/prop-types */

const MovieCard = ({ movie, onFavorite, favorites }) => {
  return (
    <div className="movie-card border-2 border-black bg-slate-500 flex flex-col gap-4 p-2 rounded-md">
      <div className="border-2 border-black w-72 h-44 overflow-hidden rounded-lg">
        <img
          src={movie?.img}
          alt="poster"
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="flex w-full justify-between items-center text-slate-900">
        <div className="flex flex-col justify-center">
          <h1>
            <strong>Name:</strong> {movie.title}
          </h1>
          <h3>
            <strong>Release Year:</strong> {movie?.release_date?.split("-")[0]}
          </h3>
        </div>
        <button onClick={() => onFavorite(movie)} className="text-[2rem]">
          {favorites ? (favorites.includes(movie.id) ? "★" : "☆") : "☆"}
        </button>
      </div>
    </div>
  );
};

export default MovieCard;

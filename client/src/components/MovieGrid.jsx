/* eslint-disable react/prop-types */
import MovieCard from './MovieCard';

const MovieGrid = ({ movies, onFavorite, favorites }) => {
  return (
    <div className="movie-grid p-4 my-4 flex flex-wrap gap-8 justify-center">
      {Array.isArray(movies) && movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} onFavorite={onFavorite} favorites={favorites}/>
      ))}
    </div>
  );
};

export default MovieGrid;

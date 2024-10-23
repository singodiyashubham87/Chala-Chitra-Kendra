/* eslint-disable react/prop-types */
import { useMovies } from "../context/MoviesContext";
import MovieCard from "./MovieCard";
import { memo } from "react";

const MovieGrid = () => {
  const { movies, handleFavorite, favorites } = useMovies();
  return (
    <div className="movie-grid p-4 my-4 flex flex-wrap gap-8 justify-center">
      {Array.isArray(movies) &&
        movies.map((movie) => (
          <MovieCard
            key={movie.backdrop_path}
            movie={movie}
            handleFavorite={handleFavorite}
            favorites={favorites}
          />
        ))}
    </div>
  );
};

export const MemoizedMovieGrid = memo(MovieGrid);

export default MemoizedMovieGrid;
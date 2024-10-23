/* eslint-disable react/prop-types */
import MovieCard from "./MovieCard";
import { memo } from "react";

const MovieGrid = ({ movies, onFavorite, favorites }) => {

  return (
    <div className="movie-grid p-4 my-4 flex flex-wrap gap-8 justify-center">
      {Array.isArray(movies) &&
        movies.map((movie) => (
          <MovieCard
            key={movie.backdrop_path}
            movie={movie}
            onFavorite={onFavorite}
            favorites={favorites}
          />
        ))}
    </div>
  );
};

export const MemoizedMovieGrid = memo(MovieGrid);

export default MemoizedMovieGrid;
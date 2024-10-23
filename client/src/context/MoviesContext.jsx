/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from "react";
import { fetchMovies } from "../utils/helpers";
import { toast } from "react-toastify";

const MoviesContext = createContext();

export const MoviesProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favoriteMovies")) || []
  );

  useEffect(() => {
    localStorage.setItem("favoriteMovies", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    const loadInitialMovies = async () => {
      const initialMovies = await fetchMovies(toast, setIsLoading);
      setMovies(initialMovies ?? []);
    };
    loadInitialMovies();
  }, []);

  const loadMoreMovies = async (currentPage) => {
    const nextPage = currentPage + 1;
    const moreMovies = await fetchMovies(toast, setIsLoading, nextPage);

    if (moreMovies.length > 0) {
      setMovies((prev) => [...prev, ...moreMovies]);
    } else {
      toast.error("No more movies to load!");
    }
  };

  const handleFavorite = (movie) => {
    setFavorites((prev) => {
      const isFavorited = prev.includes(movie.id);
      if (isFavorited) {
        toast.error("Removed from favorites");
        return prev.filter((id) => id !== movie.id);
      } else {
        toast.success("Added to favorites");
        return [...prev, movie.id];
      }
    });
  };
  return (
    <MoviesContext.Provider
      value={{
        movies,
        setMovies,
        isLoading,
        setIsLoading,
        favorites,
        handleFavorite,
        loadMoreMovies,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

export const useMovies = () => useContext(MoviesContext);

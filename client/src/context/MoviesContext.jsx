/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from "react";
import { fetchMovies } from "../utils/helpers";
import { toast } from "react-toastify";
import MOVIE from "../constants/MOVIE";

const MoviesContext = createContext();

export const MoviesProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFavoritesShown, setIsFavoritesShown] = useState(false)
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

  const loadMoreMovies = async () => {
    const nextPage = Math.ceil(movies.length / MOVIE.PER_PAGE_SIZE) + 1;
    const moreMovies = await fetchMovies(toast, setIsLoading, nextPage);

    if (moreMovies.length > 0) {
      setMovies((prev) => [...prev, ...moreMovies]);
    } else {
      toast.error("No more movies to load!");
    }
  };

  const handleFavorite = (event, movie) => {
    event.stopPropagation()
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

  const handleMyFavoriteClick = () => {
    if (isFavoritesShown) {
      setMovies(allMovies);
    } else {
      setAllMovies(movies)
      setMovies(movies.filter((movie) => favorites.includes(movie?.id)));
    }
    setIsFavoritesShown(!isFavoritesShown);
  };


  return (
    <MoviesContext.Provider
      value={{
        movies,
        setMovies,
        isLoading,
        setIsLoading,
        isFavoritesShown,
        setIsFavoritesShown,
        favorites,
        loadMoreMovies,
        handleFavorite,
        handleMyFavoriteClick,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

export const useMovies = () => useContext(MoviesContext);

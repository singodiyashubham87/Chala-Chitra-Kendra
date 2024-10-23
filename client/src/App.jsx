import { useState, useEffect } from "react";
import FilterBar from "./components/FilterBar";
import SearchBar from "./components/SearchBar";
import MovieGrid from "./components/MovieGrid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./components/Loader";
import InfiniteScroll from "./components/InfiniteScroll";
import MOVIE from "./constants/MOVIE";
import { fetchMovies } from "./utils/helpers";

const App = () => {
  const [allMovies, setAllMovies] = useState([])
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFavoritesShown, setIsFavoritesShown] = useState(false);
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
    const nextPage = movies.length / MOVIE.PER_PAGE_SIZE + 1;
    const moreMovies = await fetchMovies(toast, setIsLoading, nextPage);

    if (moreMovies.length > 0) {
      setMovies((prev) => [...prev, ...moreMovies]);
    } else {
      toast("🦄 Error fetching more movies!");
    }
  };

  const handleFavorite = (movie) => {
    setFavorites((prev) => {
      const isFavorited = prev.some((movieId) => movieId == movie.id);
      if (isFavorited) {
        toast.error("Removed from favorites");
        return prev.filter((movieId) => movieId !== movie.id);
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
    <div className="w-full bg-slate-200 min-h-screen px-0 py-4 md:px-4 flex flex-col items-center">
      <div className="flex w-[97%] md:w-[90%] gap-4 items-center justify-between pb-4">
        <h1 className="text-sm vvsm:text-xl md:text-[2rem] font-bold uppercase">
          Chala-Chitra-Kendra
        </h1>
        <button
          className="px-4 py-2 bg-slate-300 border-2 border-black rounded-md"
          onClick={handleMyFavoriteClick}
        >
          {isFavoritesShown ? "All Movies" : "My Favorites"}
        </button>
      </div>
      <div className="w-[97%] md:w-[90%] border-2 border-black rounded-md p-4 bg-slate-600">
        <div className="flex flex-col gap-2 md:px-8 justify-between items-center mmd:flex-row md:gap-0">
          <FilterBar
            setMovies={setMovies}
            toast={toast}
            setIsLoading={setIsLoading}
          />
          <SearchBar
            setMovies={setMovies}
            toast={toast}
            setIsLoading={setIsLoading}
          />
        </div>
        <MovieGrid
          movies={movies}
          onFavorite={handleFavorite}
          favorites={favorites}
        />
        {isLoading && <Loader />}
        <InfiniteScroll loadMore={loadMoreMovies} />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </div>
  );
};

export default App;

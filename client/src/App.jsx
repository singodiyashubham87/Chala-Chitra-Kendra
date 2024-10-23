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

  const handleFilterChange = (filters) => {
    // Apply filters to movie data (you can make an API call here)
    // Example: Filtering logic for local state (replace with actual filtering logic)
    console.log(filters);
  };

  return (
    <div className="w-full bg-slate-200 min-h-screen p-4 flex flex-col items-center">
      <h1 className="text-[2rem] font-bold uppercase pb-4">
        Chala-Chitra-Kendra
      </h1>
      <div className="w-[90%] border-2 border-black rounded-md p-4 bg-slate-600">
        <div className="flex justify-between items-center ">
          <FilterBar onFilterChange={handleFilterChange} />
          <SearchBar setMovies={setMovies} toast={toast} setIsLoading={setIsLoading}/>
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

import { useMovies } from "./context/MoviesContext";
import FilterBar from "./components/FilterBar";
import SearchBar from "./components/SearchBar";
import MovieGrid from "./components/MovieGrid";
import Loader from "./components/Loader";
import InfiniteScroll from "./components/InfiniteScroll";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const { isLoading, isFavoritesShown, handleMyFavoriteClick } = useMovies();
  return (
      <div className="w-full bg-slate-200 min-h-screen px-0 py-4 md:px-4 flex flex-col items-center">
      <div className="flex flex-col msm:flex-row w-[97%] md:w-[90%] gap-4 items-center justify-between pb-4">
        <h1 className="text-sm vvsm:text-xl md:text-[2rem] font-bold uppercase">
          Chala-Chitra-Kendra
        </h1>
        <button
          className="text-sm vvsm:text-xl px-4 py-2 bg-slate-300 border-2 border-black rounded-md"
          onClick={handleMyFavoriteClick}
        >
          {isFavoritesShown ? "All Movies" : "My Favorites"}
        </button>
      </div>
        <div className="w-[97%] md:w-[90%] border-2 border-black rounded-md p-4 bg-slate-600">
          <div className="flex flex-col gap-2 md:px-8 justify-between items-center mmd:flex-row md:gap-0">
            <FilterBar />
            <SearchBar />
          </div>
          <MovieGrid />
          {isLoading && <Loader />}
          <InfiniteScroll />
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

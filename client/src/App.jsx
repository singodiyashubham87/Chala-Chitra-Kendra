import { useState, useEffect } from "react";
import FilterBar from "./components/FilterBar";
import SearchBar from "./components/SearchBar";
import MovieGrid from "./components/MovieGrid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem("favoriteMovies")) || []);

  useEffect(() => {
    localStorage.setItem("favoriteMovies", JSON.stringify(favorites));
  }, [favorites]);

  const fetchMovies = async () => {
    try {
      const url = import.meta.env.VITE_BASE_URL;
      const res = await axios.get(`${url}/discover/movie`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            import.meta.env.VITE_TMDB_API_READ_ACCESS_TOKEN
          }`,
        },
      });
      console.log("response:", res.data);
    } catch (error) {
      console.error("Error in fetching movies", error);
    }
  };

  useEffect(() => {
    // const movies = fetchMovies();
    const moviess = [{id:1, title:"The Worlf", release_date:"2019-09-05", img:'https://cms.imgworlds.com/assets/a5366382-0c26-4726-9873-45d69d24f819.jpg?key=home-gallery'}, {id:2, title:"Master", release_date:"2014-09-05", img:'https://cms.imgworlds.com/assets/a5366382-0c26-4726-9873-45d69d24f819.jpg?key=home-gallery'},{id:3, title:"The Lion King", release_date:"2013-09-05", img:'https://cms.imgworlds.com/assets/a5366382-0c26-4726-9873-45d69d24f819.jpg?key=home-gallery'}, {id:4, title:"V", release_date:"2011-09-05", img:'https://cms.imgworlds.com/assets/a5366382-0c26-4726-9873-45d69d24f819.jpg?key=home-gallery'}]
    setMovies(moviess ?? []);
  }, []);

  const handleFavorite = (movie) => {
    console.log("🚀 ~ handleFavorite ~ movie:", movie)
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
    <div className="bg-slate-200 h-[95vh] p-4">
      <h1 className="text-[2rem] font-bold uppercase text-center pb-4">Chala-Chitra-Kendra</h1>
      <div className="border-2 border-black rounded-md p-4 bg-slate-600">
        <div className="flex justify-between items-center ">
          <FilterBar onFilterChange={handleFilterChange} />
          <SearchBar setMovies={setMovies} />
        </div>
        <MovieGrid movies={movies} onFavorite={handleFavorite} favorites={favorites}/>
        <ToastContainer />
      </div>
    </div>
  );
};

export default App;

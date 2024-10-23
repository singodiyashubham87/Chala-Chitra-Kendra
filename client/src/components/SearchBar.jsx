import { useRef, useState } from "react";
import { debounce, searchMovies } from "../utils/helpers";
import { useMovies } from "../context/MoviesContext";
import { toast } from "react-toastify";

const SearchBar = () => {
  const { setMovies, setIsLoading } = useMovies();
  const [query, setQuery] = useState("");

  const debouncedSearchMovies = useRef(
    debounce(async (query) => {
      setIsLoading(true);
      try {
        const searchResultMovies = await searchMovies(
          query,
          toast,
          setIsLoading,
          setMovies
        );
        if (searchResultMovies.length > 0) setMovies(searchResultMovies);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    })
  ).current;

  const handleSearch = async (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    debouncedSearchMovies(newQuery);
  };

  return (
    <div className="searchBar text-center">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search for movies..."
        className="border-2 border-black px-2 vvsm:py-2 vvsm:px-4 rounded-md w-[95%]"
      />
    </div>
  );
};

export default SearchBar;

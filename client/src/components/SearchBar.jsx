/* eslint-disable no-unused-vars */
import { useCallback, useRef, useState } from "react";
import { debounce, searchMovies } from "../utils/helpers";

/* eslint-disable react/prop-types */
const SearchBar = ({ setMovies, toast, setIsLoading }) => {
  const [query, setQuery] = useState("");

  const fetchMovies = useCallback(() => {
    if (query) {
      fetch(`https://api.example.com/movies?search=${query}`)
        .then((response) => response.json())
        .then((data) => setMovies(data));
    }
  }, [query, setMovies]);

  const debouncedSearchMovies = useRef(
    debounce(async (query) => {
      setIsLoading(true);
      const searchResultMovies = await searchMovies(query, toast, setIsLoading, setMovies);
      setMovies(searchResultMovies);
      setIsLoading(false);
    })
  ).current;

  const handleSearch = async (e) => {
    const newQuery = e.target.value
    setQuery(newQuery);
    debouncedSearchMovies(newQuery);
  };

  return (
    <div className="searchBar">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search for movies..."
        className="border-2 border-black py-2 px-4 rounded-md"
      />
    </div>
  );
};

export default SearchBar;

/* eslint-disable no-unused-vars */
import { useRef, useState } from "react";
import { debounce, searchMovies } from "../utils/helpers";

/* eslint-disable react/prop-types */
const SearchBar = ({ setMovies, toast, setIsLoading }) => {
  const [query, setQuery] = useState("");

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

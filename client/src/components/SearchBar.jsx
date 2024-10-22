import { useCallback, useState } from "react";

/* eslint-disable react/prop-types */
const SearchBar = ({ setMovies }) => {
  const [query, setQuery] = useState("");

  const fetchMovies = useCallback(() => {
    // Debounce logic here
    if (query) {
      fetch(`https://api.example.com/movies?search=${query}`)
        .then((response) => response.json())
        .then((data) => setMovies(data));
    }
  }, [query, setMovies]);

  const handleSearch = (e) => {
    setQuery(e.target.value);
    // Adding debounce
    setTimeout(fetchMovies, 300);
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

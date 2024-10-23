/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { fetchMoviesByGenreId } from "../utils/helpers";

const FilterBar = ({ setMovies, toast, setIsLoading }) => {
  const [genres, setGenres] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [ratingRange, setRatingRange] = useState("");

  const fetchAndSetGenres = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/genre/movie/list`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            import.meta.env.VITE_TMDB_API_READ_ACCESS_TOKEN
          }`,
        },
      }
    );
    const data = await response.json();
    const genres = data?.genres;
    setGenres(genres);
  };

  const fetchAndSetYear = () => {
    const years = [
      2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021,
      2022, 2023, 2024,
    ];
    setYears(years);
  };

  useEffect(() => {
    fetchAndSetGenres();
    fetchAndSetYear();
  }, []);

  const handleGenreChange = async (e) => {
    const selectedGenre = e.target.value;
    setSelectedGenre(selectedGenre);
    const genreId = genres.find((genre) => genre.name === selectedGenre)?.id;
    const movies = await fetchMoviesByGenreId(genreId, toast, setIsLoading, setMovies)
    setMovies(movies);
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const handleRatingChange = (e) => {
    const value = Number(e.target.value);
    setRatingRange(value);
  };

  return (
    <div className="filter-bar border-2 border-black p-2 flex justify-evenly items-center gap-4 rounded-md bg-slate-400">
      <div className="border-2 border-black genre">
        <select value={selectedGenre} onChange={handleGenreChange}>
          <option value="">Select Genre</option>
          {Array.isArray(genres) &&
            genres.map((genre) => (
              <option key={genre.id} value={genre.name}>
                {genre.name}
              </option>
            ))}
        </select>
      </div>

      <div className="border-2 border-black releaseYear">
        <select value={selectedYear} onChange={handleYearChange}>
          <option value="">Select Year</option>
          {Array.isArray(years) &&
            years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
        </select>
      </div>

      <div className="border-2 border-black rounded-md py-2 px-4 bg-slate-300">
        <label>Rating Range: {ratingRange}</label>
        <input
          type="range"
          min="0"
          max="10"
          value={ratingRange}
          onChange={handleRatingChange}
        />
      </div>
    </div>
  );
};

export default FilterBar;

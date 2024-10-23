/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { fetchAndSetGenres } from "../utils/helpers";
import axios from "axios";
import { useMovies } from "../context/MoviesContext";
import { toast } from "react-toastify";

const FilterBar = () => {
  const { setMovies, setIsLoading } = useMovies();
  const [genres, setGenres] = useState([]);
  const [startYear, setStartYear] = useState(1900);
  const [endYear, setEndYear] = useState(new Date().getFullYear());
  const [selectedGenre, setSelectedGenre] = useState("");
  const [ratingRange, setRatingRange] = useState(0);

  useEffect(() => {
    fetchAndSetGenres(setGenres, toast, setIsLoading);
  }, []);

  const handleGenreChange = (e) => {
    const genre = e.target.value;
    setSelectedGenre(genre);
    fetchFilteredMovies(genre, [startYear, endYear], ratingRange);
  };

  const handleStartYearChange = (e) => {
    const year = Number(e.target.value);
    setStartYear(year);
    if (year <= endYear) {
      fetchFilteredMovies(selectedGenre, [year, endYear], ratingRange);
    } else {
      toast("Start year cannot be greater than end year!");
    }
  };

  const handleEndYearChange = (e) => {
    const year = Number(e.target.value);
    setEndYear(year);
    if (year >= startYear) {
      fetchFilteredMovies(selectedGenre, [startYear, year], ratingRange);
    } else {
      toast("End year cannot be less than start year!");
    }
  };

  const handleRatingChange = (e) => {
    const rating = Number(e.target.value);
    setRatingRange(rating);
    fetchFilteredMovies(selectedGenre, [startYear, endYear], rating);
  };

  const fetchFilteredMovies = async (genre, [startYear, endYear], rating) => {
    try {
      setIsLoading(true);

      const params = {
        "primary_release_date.gte": `${startYear}-01-01`,
        "primary_release_date.lte": `${endYear}-12-31`,
        include_adult: "false",
        "vote_average.gte": rating,
      };

      if (genre) {
        params.with_genres = genres.find((g) => g.name === genre)?.id;
      }

      const url = `${import.meta.env.VITE_BASE_URL}/discover/movie`;
      const res = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            import.meta.env.VITE_TMDB_API_READ_ACCESS_TOKEN
          }`,
        },
        params,
      });

      const movies = res?.data?.results;
      if (movies) {
        setMovies(movies);
      } else {
        toast("No movies found for the selected filters!");
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      toast("Error fetching movies!");
    } finally {
      setIsLoading(false);
    }
  };

  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = 1900; year <= currentYear; year++) {
      years.push(year);
    }
    return years;
  };

  return (
    <div className="filter-bar p-2 flex flex-col justify-evenly items-center gap-4 rounded-md">
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="border-2 border-black genre">
          <select
            value={selectedGenre}
            onChange={handleGenreChange}
            className="bg-slate-300"
          >
            <option value="">Select Genre</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.name}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>

        <div className="border-2 border-black rounded-md bg-slate-300 text-center vvsm:px-4 vvsm:py-2">
          <label className="text-sm vvsm:text-lg">
            Rating Range: {ratingRange}
          </label>
          <input
            type="range"
            min="0"
            max="10"
            step="0.1"
            value={ratingRange}
            onChange={handleRatingChange}
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="border-2 border-black rounded-md bg-slate-300 px-4">
          <label className="text-sm vvsm:text-lg">Start Year:</label>
          <select
            value={startYear}
            onChange={handleStartYearChange}
            className="bg-slate-300"
          >
            {generateYearOptions().map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div className="border-2 border-black rounded-md bg-slate-300 px-4">
          <label className="text-sm vvsm:text-lg">End Year:</label>
          <select
            value={endYear}
            onChange={handleEndYearChange}
            className="bg-slate-300"
          >
            {generateYearOptions().map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;

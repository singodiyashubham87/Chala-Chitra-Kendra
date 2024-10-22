/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

const FilterBar = ({ onFilterChange }) => {
  const [genres, setGenres] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [ratingRange, setRatingRange] = useState("");

  useEffect(() => {
    const fetchGenres = async () => {
      // const genreData = await fetch('/api/genres');
      // const genres = await genreData.json();
      const genress = ["Action", "Comedy", "Adventure", "Fantasy"];
      setGenres(genress);
    };

    const fetchYears = async () => {
      // const yearData = await fetch("/api/years");
      // const years = await yearData.json();
      const years = [
        2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020,
      ];
      setYears(years);
    };

    fetchGenres();
    fetchYears();
  }, []);

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
    onFilterChange({
      genre: e.target.value,
      year: selectedYear,
      rating: ratingRange,
    });
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
    onFilterChange({
      genre: selectedGenre,
      year: e.target.value,
      rating: ratingRange,
    });
  };

  const handleRatingChange = (e) => {
    const value = Number(e.target.value);
    setRatingRange(value);
    onFilterChange({ genre: selectedGenre, year: selectedYear, rating: value });
  };

  return (
    <div className="filter-bar border-2 border-black p-2 flex justify-evenly items-center gap-4 rounded-md bg-slate-400">
      <div className="border-2 border-black genre">
        <select value={selectedGenre} onChange={handleGenreChange}>
          <option value="">Select Genre</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.name}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>

      <div className="border-2 border-black releaseYear">
        <select value={selectedYear} onChange={handleYearChange}>
          <option value="">Select Year</option>
          {years.map((year) => (
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

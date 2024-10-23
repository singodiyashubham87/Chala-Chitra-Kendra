/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useMovies } from "../context/MoviesContext";

const InfiniteScroll = () => {
  const { loadMoreMovies, isFavoritesShown } = useMovies();
  console.log("🚀 ~ InfiniteScroll ~ isFavoritesShown:", isFavoritesShown)
  useEffect(() => {
    if (isFavoritesShown) return;
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        loadMoreMovies();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadMoreMovies]);

  return null;
};

export default InfiniteScroll;

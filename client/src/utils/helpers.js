import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_READ_ACCESS_TOKEN}`,
  },
});

const apiRequest = async (url, params, setIsLoading, toast) => {
  try {
    setIsLoading(true);
    const response = await api.get(url, { params });
    return response?.data?.results || [];
  } catch (error) {
    console.error(`Error fetching from ${url}:`, error);
    toast(`Error fetching data!`);
    return [];
  } finally {
    setIsLoading(false);
  }
};

const debounce = (func, delay = 300) => {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
};

const fetchMovies = (toast, setIsLoading, page = 1) =>
  apiRequest(
    "/discover/movie",
    { page, include_adult: false },
    setIsLoading,
    toast
  );

const searchMovies = async (queryKey, toast, setIsLoading) => {
  if (!queryKey) return fetchMovies(toast, setIsLoading);
  return apiRequest(
    "/search/movie",
    { query: queryKey, include_adult: false },
    setIsLoading,
    toast
  );
};

const fetchAndSetGenres = async (setGenres, toast, setIsLoading) => {
  try {
    setIsLoading(true);
    const response = await api.get("/genre/movie/list");
    setGenres(response?.data?.genres || []);
  } catch (error) {
    console.error("Error fetching genres:", error);
    toast("Error fetching genres!");
  } finally {
    setIsLoading(false);
  }
};

export { fetchMovies, searchMovies, debounce, fetchAndSetGenres };

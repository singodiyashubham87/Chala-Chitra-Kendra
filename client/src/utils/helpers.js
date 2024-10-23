import axios from "axios";

export const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getFromLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key)) || [];
};

const fetchMovies = async (toast, setIsLoading, page = 1) => {
  try {
    setIsLoading(true);
    const url = import.meta.env.VITE_BASE_URL;
    const res = await axios.get(`${url}/discover/movie`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          import.meta.env.VITE_TMDB_API_READ_ACCESS_TOKEN
        }`,
      },
      params: { page },
    });

    if (!res?.data?.results) {
      toast("🦄 Error fetching movies!");
      return [];
    }

    return res.data.results;
  } catch (error) {
    console.error("Error in fetching movies", error);
    toast("🦄 Error fetching movies!");
    return [];
  } finally {
    setIsLoading(false);
  }
};

const searchMovies = async (queryKey, toast, setIsLoading) => {
  try {
    setIsLoading(true);

    if (!queryKey) {
      return await fetchMovies(toast, setIsLoading);
    }
    const res = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/search/movie`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            import.meta.env.VITE_TMDB_API_READ_ACCESS_TOKEN
          }`,
        },
        params: {
          query: queryKey,
          include_adult: false,
        },
      }
    );
    if (!res?.data?.results) {
      toast("🦄 Error searching movies!");
      return [];
    }
    return res.data.results;
  } catch (error) {
    console.error("Error in searching movies", error);
    toast("🦄 Error searching movies!");
    return [];
  } finally {
    setIsLoading(false);
  }
};

const debounce = (func) => {
  let timer;
  return function (...args) {
    const context = this;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      func.apply(context, args);
    }, 300);
  };
};

export { fetchMovies, searchMovies, debounce };

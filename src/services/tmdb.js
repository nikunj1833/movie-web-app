const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
console.log("TMDB KEY:", API_KEY);

export const fetchTMDBMovies = async (query) => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
    );

    const data = await res.json();

    return data.results || [];
  } catch (error) {
    console.log(error);
    return [];
  }
};
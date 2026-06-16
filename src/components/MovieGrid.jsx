import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MovieGrid = ({ search }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const API_KEY = "1a084661";

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("myList")) || [];
    setFavorites(saved);
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);

      try {
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`
        );

        const data = await res.json();

        if (data.Response === "True") {
          setMovies(data.Search);
        } else {
          setMovies([]);
        }
      } catch (error) {
        console.log(error);
        setMovies([]);
      }

      setLoading(false);
    };

    fetchMovies();
  }, [search]);

  const toggleFavorite = (movie) => {
    let saved = JSON.parse(localStorage.getItem("myList")) || [];

    const exists = saved.some((item) => item.imdbID === movie.imdbID);

    if (exists) {
      saved = saved.filter((item) => item.imdbID !== movie.imdbID);
    } else {
      saved.push({
        imdbID: movie.imdbID,
        Title: movie.Title,
        Year: movie.Year,
        Poster: movie.Poster,
        Type: movie.Type,
      });
    }

    localStorage.setItem("myList", JSON.stringify(saved));
    setFavorites(saved);
  };

  const isFavorite = (id) => {
    return favorites.some((item) => item.imdbID === id);
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black px-8 pt-28 text-white md:px-20">
      <motion.h1
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8 text-3xl font-bold"
      >
        Results for:
        <span className="ml-2 text-purple-500">{search}</span>
      </motion.h1>

      {loading && <p className="text-gray-400">Loading Movies...</p>}

      {!loading && movies.length === 0 && (
        <p className="text-gray-400">No movies found</p>
      )}

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.08,
            },
          },
        }}
        className="grid grid-cols-2 gap-5 md:grid-cols-4 lg:grid-cols-6"
      >
        {movies.map((movie) => (
          <motion.div
            key={movie.imdbID}
            variants={{
              hidden: {
                opacity: 0,
                y: 40,
              },
              visible: {
                opacity: 1,
                y: 0,
              },
            }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to={`/movie/${movie.imdbID}`}
              className="group relative block overflow-hidden rounded-2xl bg-zinc-900 shadow-lg transition-all duration-300 hover:-translate-y-3 hover:scale-[1.03] hover:shadow-[0_0_35px_rgba(168,85,247,0.5)]"
            >
              <button
                onClick={(e) => {
                  e.preventDefault();
                  toggleFavorite(movie);
                }}
                className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-xl backdrop-blur-md transition hover:scale-110 hover:bg-black"
              >
                {isFavorite(movie.imdbID) ? "❤️" : "🤍"}
              </button>

              <img
                src={
                  movie.Poster !== "N/A"
                    ? movie.Poster
                    : "https://placehold.co/300x450?text=No+Image"
                }
                alt={movie.Title}
                className="h-[320px] w-full object-cover transition duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 transition-all duration-300 group-hover:opacity-100">
                <div className="absolute bottom-0 w-full p-4">
                  <h2 className="line-clamp-2 text-sm font-bold">
                    {movie.Title}
                  </h2>

                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="rounded-full bg-purple-600 px-3 py-1 text-[10px] font-semibold">
                      {movie.Year}
                    </span>

                    <span className="rounded-full bg-white/20 px-3 py-1 text-[10px] font-semibold">
                      {movie.Type}
                    </span>
                  </div>

                  <p className="mt-3 text-xs text-gray-300">
                    Click card for details
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default MovieGrid;
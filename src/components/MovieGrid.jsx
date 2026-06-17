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

      const startTime = Date.now();

      try {
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`
        );

        const data = await res.json();
        console.log(data);

        if (data.Response === "True") {
          setMovies(data.Search);
        } else {
          setMovies([]);
        }
      } catch (error) {
        console.log(error);
        setMovies([]);
      }

      const elapsed = Date.now() - startTime;

      if (elapsed < 1500) {
        await new Promise((resolve) =>
          setTimeout(resolve, 1500 - elapsed)
        );
      }

      setLoading(false);
    };

    fetchMovies(); // 

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

  return (<section className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black px-4 pt-24 text-white sm:px-6 md:px-10 lg:px-20">
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

      <motion.h1
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-2xl font-bold sm:text-3xl"
      >
        Results for:
        <span className="ml-2 text-purple-500">
          {search}
        </span>
      </motion.h1>

      <button
        onClick={() => window.location.reload()}
        className="rounded-full border border-purple-500/30 px-5 py-2 font-semibold text-purple-400 transition-all hover:bg-purple-600 hover:text-white"
      >
        ← Back Home
      </button>

    </div>

    {loading && (
      <div
        className="
        grid
        grid-cols-2
        gap-4
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
        2xl:grid-cols-6
      "
      >
        {[...Array(12)].map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-2xl bg-zinc-900"
          >
            <div className="relative h-[240px] overflow-hidden rounded-2xl bg-zinc-800 sm:h-[280px] md:h-[320px]">

              <div className="absolute inset-0 animate-pulse bg-zinc-800"></div>

              <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

            </div>

            <div className="space-y-3 p-3">
              <div className="h-4 w-3/4 animate-pulse rounded bg-zinc-800" />
              <div className="h-3 w-1/2 animate-pulse rounded bg-zinc-800" />
            </div>
          </div>
        ))}
      </div>
    )}

    {!loading && movies.length === 0 && (
      <p className="text-center text-gray-400">
        No movies found
      </p>
    )}

    {!loading && (
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
        className="
        grid
        grid-cols-2
        gap-4
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
        2xl:grid-cols-6
      "
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
              className="group relative block overflow-hidden rounded-2xl bg-zinc-900 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-purple-500/40"
            >
              <button
                onClick={(e) => {
                  e.preventDefault();
                  toggleFavorite(movie);
                }}
                className="absolute right-2 top-2 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-lg backdrop-blur-md transition hover:scale-110"
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
                className="
                h-[240px]
                w-full
                object-cover
                transition
                duration-700
                group-hover:scale-110
                sm:h-[280px]
                md:h-[320px]
              "
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 transition-all duration-300 group-hover:opacity-100">
                <div className="absolute bottom-0 w-full p-3">
                  <h2 className="line-clamp-2 text-xs font-bold sm:text-sm">
                    {movie.Title}
                  </h2>

                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="rounded-full bg-purple-600 px-2 py-1 text-[10px] font-semibold">
                      {movie.Year}
                    </span>

                    <span className="rounded-full bg-white/20 px-2 py-1 text-[10px] font-semibold">
                      {movie.Type}
                    </span>
                  </div>

                  <p className="mt-2 text-[10px] text-gray-300 sm:text-xs">
                    Click card for details
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    )}
  </section>


  );
};

export default MovieGrid;

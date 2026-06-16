import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MyList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const savedMovies = JSON.parse(localStorage.getItem("myList")) || [];
    setMovies(savedMovies);
  }, []);

  const removeMovie = (id) => {
    const updatedMovies = movies.filter((movie) => movie.imdbID !== id);
    setMovies(updatedMovies);
    localStorage.setItem("myList", JSON.stringify(updatedMovies));
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black px-8 py-10 text-white md:px-20">
      <div className="mb-10 flex items-center justify-between">
        <h1 className="text-4xl font-black">❤️ My List</h1>

        <Link
          to="/"
          className="rounded-full bg-white/10 px-5 py-2 text-sm font-semibold backdrop-blur-md hover:bg-white hover:text-black"
        >
          ← Back Home
        </Link>
      </div>

      {movies.length === 0 && (
        <p className="text-gray-400">Your list is empty.</p>
      )}

      <div className="grid grid-cols-2 gap-5 md:grid-cols-4 lg:grid-cols-6">
        {movies.map((movie) => (
          <div
            key={movie.imdbID}
            className="overflow-hidden rounded-xl bg-zinc-900 shadow-lg"
          >
            <Link to={`/movie/${movie.imdbID}`}>
              <img
                src={
                  movie.Poster !== "N/A"
                    ? movie.Poster
                    : "https://placehold.co/300x450?text=No+Image"
                }
                alt={movie.Title}
                className="h-[260px] w-full object-cover"
              />
            </Link>

            <div className="p-3">
              <h2 className="line-clamp-2 text-sm font-bold">
                {movie.Title}
              </h2>
              <p className="mt-1 text-xs text-gray-400">{movie.Year}</p>

              <button
                onClick={() => removeMovie(movie.imdbID)}
                className="mt-3 w-full rounded-lg bg-red-500 py-2 text-sm font-bold text-white hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MyList;
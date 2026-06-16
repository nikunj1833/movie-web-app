import { useState } from "react";
import { Link } from "react-router-dom";

const API_KEY = "1a084661";

const moods = [
  { emoji: "😊", name: "Happy", query: "comedy" },
  { emoji: "😢", name: "Sad", query: "drama" },
  { emoji: "😍", name: "Romantic", query: "romance" },
  { emoji: "😱", name: "Thriller", query: "thriller" },
  { emoji: "⚡", name: "Action", query: "action" },
];

const MoodPicker = () => {
  const [movies, setMovies] = useState([]);
  const [activeMood, setActiveMood] = useState("");
  const [loading, setLoading] = useState(false);

  const handleMood = async (mood) => {
    setActiveMood(mood.name);
    setLoading(true);

    const res = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=${mood.query}`
    );

    const data = await res.json();

    if (data.Response === "True") {
      setMovies(data.Search);
    } else {
      setMovies([]);
    }

    setLoading(false);
  };

  return (
    <section className="bg-black px-8 py-12 text-white md:px-20">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <h2 className="mb-2 text-3xl font-black">🎭 What's your mood today?</h2>
        <p className="mb-6 text-gray-400">
          Pick your mood and get movie recommendations.
        </p>

        <div className="mb-8 flex flex-wrap gap-4">
          {moods.map((mood) => (
            <button
              key={mood.name}
              onClick={() => handleMood(mood)}
              className={`rounded-full px-5 py-3 font-bold transition hover:scale-105 ${
                activeMood === mood.name
                  ? "bg-purple-600 text-white"
                  : "bg-white/10 text-white hover:bg-white hover:text-black"
              }`}
            >
              {mood.emoji} {mood.name}
            </button>
          ))}
        </div>

        {loading && <p className="text-gray-400">Finding movies...</p>}

        {activeMood && !loading && (
          <h3 className="mb-5 text-xl font-bold">
            Recommended for{" "}
            <span className="text-purple-400">{activeMood}</span>
          </h3>
        )}

        <div className="flex gap-5 overflow-x-auto pb-3">
          {movies.map((movie) => (
            <Link
              to={`/movie/${movie.imdbID}`}
              key={movie.imdbID}
              className="group min-w-[150px] overflow-hidden rounded-xl bg-zinc-900 transition hover:-translate-y-2"
            >
              <img
                src={
                  movie.Poster !== "N/A"
                    ? movie.Poster
                    : "https://placehold.co/300x450?text=No+Image"
                }
                alt={movie.Title}
                className="h-[220px] w-full object-cover transition group-hover:scale-110"
              />

              <div className="p-3">
                <h4 className="line-clamp-2 text-sm font-bold">
                  {movie.Title}
                </h4>
                <p className="mt-1 text-xs text-gray-400">{movie.Year}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MoodPicker;
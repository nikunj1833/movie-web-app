import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { fetchTMDBMovies } from "../services/tmdb";

const API_KEY = "1a084661";

const categories = [
  { title: "🇮🇳 Top Bollywood", query: "dhurandhar", tmdb: true },
  { title: "🆕 New Bollywood", query: "animal", tmdb: true },
  { title: "🎞️ Classic Bollywood", query: "sholay", tmdb: true },

  { title: "🔥 Trending", query: "marvel" },
  { title: "🎬 Action", query: "action" },
  { title: "😂 Comedy", query: "comedy" },
  { title: "👻 Horror", query: "horror" },
];
const TrendingRows = ({ darkMode }) => {
  const [rows, setRows] = useState({});
  const scrollRefs = useRef({});


  const scroll = (title, direction) => {
    const container = scrollRefs.current[title];

    if (!container) return;

    container.scrollBy({
      left: direction === "left" ? -500 : 500,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const fetchRows = async () => {
      const allData = {};

      for (let item of categories) {

        if (item.tmdb) {
          const movies = await fetchTMDBMovies(item.query);
          console.log(item.title);
          console.log(movies);
          allData[item.title] = movies;
        } else {
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${API_KEY}&s=${item.query}`
          );

          const data = await res.json();

          if (data.Response === "True") {
            allData[item.title] = data.Search;
          } else {
            allData[item.title] = [];
          }
        }
      }

      setRows(allData);
    };

    fetchRows();
  }, []);

  return (
    <section
      className={`px-8 py-12 transition-all duration-500 md:px-20 ${darkMode
        ? "bg-black text-white"
        : "bg-white text-black"
        }`}
    >
      {categories.map((category) => (
        <div key={category.title} className="mb-10">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              {category.title}
            </h2>

            <div className="flex gap-2">
              <button
                onClick={() => scroll(category.title, "left")}
                className="rounded-full bg-zinc-800 px-3 py-2 text-white"
              >
                ←
              </button>

              <button
                onClick={() => scroll(category.title, "right")}
                className="rounded-full bg-zinc-800 px-3 py-2 text-white"
              >
                →
              </button>
            </div>
          </div>

          <div
            ref={(el) => {
              scrollRefs.current[category.title] = el;
            }}
            className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide"
          >
            {rows[category.title]?.map((movie) => (
              <Link
                to={
                  category.tmdb
                    ? `/tmdb-movie/${movie.id}`
                    : `/movie/${movie.imdbID}`
                }
                key={movie.id || movie.imdbID}
                className={`group min-w-[160px] overflow-hidden rounded-xl transition hover:-translate-y-2 ${darkMode
                  ? "bg-zinc-900"
                  : "bg-white border border-zinc-200 shadow-md"
                  }`}
              >
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : movie.Poster !== "N/A"
                        ? movie.Poster
                        : "https://placehold.co/300x450?text=No+Image"
                  }
                  alt={movie.title || movie.Title}
                  className="h-[230px] w-full object-cover transition group-hover:scale-110"
                />

                <div className="p-3">
                  <h3
                    className={`line-clamp-2 text-sm font-bold ${darkMode ? "text-white" : "text-black"
                      }`}
                  >
                    {movie.title || movie.Title}
                  </h3>

                  <p
                    className={`mt-1 text-xs ${darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                  >
                    {movie.release_date?.split("-")[0] || movie.Year}
                  </p>
                </div>
              </Link  >
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

export default TrendingRows;
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_KEY = "1a084661";

const categories = [
  { title: "🔥 Trending", query: "marvel" },
  { title: "🎬 Action", query: "action" },
  { title: "😂 Comedy", query: "comedy" },
  { title: "👻 Horror", query: "horror" },
];

const TrendingRows = () => {
  const [rows, setRows] = useState({});

  useEffect(() => {
    const fetchRows = async () => {
      const allData = {};

      for (let item of categories) {
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

      setRows(allData);
    };

    fetchRows();
  }, []);

  return (
    <section className="bg-black px-8 py-12 text-white md:px-20">
      {categories.map((category) => (
        <div key={category.title} className="mb-10">
          <h2 className="mb-4 text-2xl font-bold">{category.title}</h2>

          <div className="flex gap-5 overflow-x-auto pb-4">
            {rows[category.title]?.map((movie) => (
              <Link
                to={`/movie/${movie.imdbID}`}
                key={movie.imdbID}
                className="group min-w-[160px] overflow-hidden rounded-xl bg-zinc-900 transition hover:-translate-y-2"
              >
                <img
                  src={
                    movie.Poster !== "N/A"
                      ? movie.Poster
                      : "https://placehold.co/300x450?text=No+Image"
                  }
                  alt={movie.Title}
                  className="h-[230px] w-full object-cover transition group-hover:scale-110"
                />

                <div className="p-3">
                  <h3 className="line-clamp-2 text-sm font-bold">
                    {movie.Title}
                  </h3>
                  <p className="mt-1 text-xs text-gray-400">{movie.Year}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

export default TrendingRows;
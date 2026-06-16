import React from "react";

const movies = [
  { title: "Wonder Woman", img: "https://image.tmdb.org/t/p/w500/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg" },
  { title: "Batman", img: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg" },
  { title: "Superman", img: "https://image.tmdb.org/t/p/w500/dksTL9NXc3GqPBRHYHcy1aIwjS.jpg" },
  { title: "Avengers", img: "https://image.tmdb.org/t/p/w500/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg" },
];

const MovieRow = () => {
  return (
    <div className="absolute bottom-6 left-8 z-20 w-[90%] md:left-20">
      <h2 className="mb-4 text-lg font-bold text-white">Continue Watching</h2>

      <div className="flex gap-5 overflow-x-auto pb-3">
        {movies.map((movie, index) => (
          <div
            key={index}
            className="min-w-[180px] overflow-hidden rounded-2xl bg-white/10 backdrop-blur-md"
          >
            <img
              src={movie.img}
              alt={movie.title}
              className="h-24 w-full object-cover"
            />

            <div className="p-3">
              <h3 className="text-sm font-bold text-white">{movie.title}</h3>
              <p className="mt-1 text-xs text-gray-400">45 min left</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieRow;
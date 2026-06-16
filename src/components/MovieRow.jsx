import React from "react";

const movies = [
  {
    title: "Wonder Woman",
    img: "https://image.tmdb.org/t/p/w500/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg",
  },
  {
    title: "Batman",
    img: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg",
  },
  {
    title: "Superman",
    img: "https://image.tmdb.org/t/p/w500/dksTL9NXc3GqPBRHYHcy1aIwjS.jpg",
  },
  {
    title: "Avengers",
    img: "https://image.tmdb.org/t/p/w500/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg",
  },
];

const MovieRow = () => {
  return (
    <div className="absolute bottom-4 left-4 z-20 w-[92%] sm:left-8 md:bottom-6 md:left-20 md:w-[80%]">
      <h2 className="mb-4 text-base font-bold text-white md:text-lg">
        Continue Watching
      </h2>

      <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-hide md:gap-5">
        {movies.map((movie, index) => (
          <div
            key={index}
            className="min-w-[140px] overflow-hidden rounded-2xl bg-white/10 backdrop-blur-md sm:min-w-[160px] md:min-w-[180px]"
          >
            <img
              src={movie.img}
              alt={movie.title}
              className="h-20 w-full object-cover sm:h-24"
            />

            <div className="p-3">
              <h3 className="text-xs font-bold text-white sm:text-sm">
                {movie.title}
              </h3>

              <p className="mt-1 text-[10px] text-gray-400 sm:text-xs">
                45 min left
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieRow;
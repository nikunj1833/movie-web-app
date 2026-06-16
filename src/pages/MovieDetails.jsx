import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [isSaved, setIsSaved] = useState(false);
    const [showTrailer, setShowTrailer] = useState(false);

    const API_KEY = "1a084661";

    useEffect(() => {
        const fetchMovieDetails = async () => {
            const res = await fetch(
                `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`
            );

            const data = await res.json();
            setMovie(data);

            const savedMovies = JSON.parse(localStorage.getItem("myList")) || [];
            const alreadySaved = savedMovies.some(
                (item) => item.imdbID === data.imdbID
            );

            setIsSaved(alreadySaved);
        };

        fetchMovieDetails();
    }, [id]);

    const handleMyList = () => {
        const savedMovies = JSON.parse(localStorage.getItem("myList")) || [];

        if (isSaved) {
            const updatedMovies = savedMovies.filter(
                (item) => item.imdbID !== movie.imdbID
            );

            localStorage.setItem("myList", JSON.stringify(updatedMovies));
            setIsSaved(false);
        } else {
            const newMovie = {
                imdbID: movie.imdbID,
                Title: movie.Title,
                Year: movie.Year,
                Poster: movie.Poster,
            };

            localStorage.setItem(
                "myList",
                JSON.stringify([...savedMovies, newMovie])
            );

            setIsSaved(true);
        }
    };

    if (!movie) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-black text-white">
                Loading Movie...
            </div>
        );
    }

    return (
        <section
            className="relative min-h-screen bg-cover bg-center text-white"
            style={{
                backgroundImage: `url(${movie.Poster !== "N/A" ? movie.Poster : ""})`,
            }}
        >
            <div className="absolute inset-0 bg-black/80"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>

            <div className="relative z-10 px-8 py-10 md:px-20">
                <Link
                    to="/"
                    className="mb-10 inline-block rounded-full bg-white/10 px-5 py-2 text-sm font-semibold backdrop-blur-md transition hover:bg-white hover:text-black"
                >
                    ← Back Home
                </Link>

                <div className="grid items-center gap-10 md:grid-cols-[300px_1fr]">
                    <img
                        src={
                            movie.Poster !== "N/A"
                                ? movie.Poster
                                : "https://placehold.co/300x450?text=No+Image"
                        }
                        alt={movie.Title}
                        className="rounded-3xl shadow-2xl shadow-purple-500/30"
                    />

                    <div>
                        <p className="mb-3 text-sm font-bold uppercase tracking-[4px] text-purple-400">
                            Movie Details
                        </p>

                        <h1 className="mb-4 max-w-4xl text-5xl font-black md:text-7xl">
                            {movie.Title}
                        </h1>

                        <div className="mb-6 flex flex-wrap gap-3 text-sm font-semibold">
                            <span className="rounded-full bg-yellow-500 px-4 py-2 text-black">
                                ⭐ {movie.imdbRating}
                            </span>

                            <span className="rounded-full bg-white/10 px-4 py-2 backdrop-blur-md">
                                {movie.Year}
                            </span>

                            <span className="rounded-full bg-white/10 px-4 py-2 backdrop-blur-md">
                                {movie.Runtime}
                            </span>

                            <span className="rounded-full bg-white/10 px-4 py-2 backdrop-blur-md">
                                {movie.Rated}
                            </span>
                        </div>

                        <p className="mb-6 max-w-3xl text-lg leading-8 text-gray-300">
                            {movie.Plot}
                        </p>
                        <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-5">
                            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
                                <p className="text-xs text-gray-400">IMDb Rating</p>
                                <h3 className="mt-1 text-xl font-bold text-yellow-400">
                                    ⭐ {movie.imdbRating}
                                </h3>
                            </div>

                            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
                                <p className="text-xs text-gray-400">Runtime</p>
                                <h3 className="mt-1 text-xl font-bold">
                                    🎬 {movie.Runtime}
                                </h3>
                            </div>

                            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
                                <p className="text-xs text-gray-400">Year</p>
                                <h3 className="mt-1 text-xl font-bold">
                                    📅 {movie.Year}
                                </h3>
                            </div>

                            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
                                <p className="text-xs text-gray-400">Country</p>
                                <h3 className="mt-1 text-xl font-bold">
                                    🌍 {movie.Country}
                                </h3>
                            </div>

                            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
                                <p className="text-xs text-gray-400">Box Office</p>
                                <h3 className="mt-1 text-xl font-bold text-green-400">
                                    💰 {movie.BoxOffice || "N/A"}
                                </h3>
                            </div>
                        </div>

                        <div className="mb-8 grid gap-3 text-sm text-gray-300 md:grid-cols-2">
                            <p>
                                <span className="font-bold text-white">Genre:</span>{" "}
                                {movie.Genre}
                            </p>

                            <p>
                                <span className="font-bold text-white">Director:</span>{" "}
                                {movie.Director}
                            </p>

                            <p>
                                <span className="font-bold text-white">Actors:</span>{" "}
                                {movie.Actors}
                            </p>

                            <p>
                                <span className="font-bold text-white">Language:</span>{" "}
                                {movie.Language}
                            </p>

                            <p>
                                <span className="font-bold text-white">Country:</span>{" "}
                                {movie.Country}
                            </p>

                            <p>
                                <span className="font-bold text-white">Box Office:</span>{" "}
                                {movie.BoxOffice}
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <button
                                onClick={() => setShowTrailer(true)}
                                className="rounded-full bg-red-600 px-8 py-3 font-bold text-white transition hover:scale-105 hover:bg-red-700"
                            >
                                ▶ Watch Trailer
                            </button>

                            <button
                                onClick={handleMyList}
                                className={`rounded-full px-8 py-3 font-bold transition ${isSaved
                                    ? "bg-purple-600 text-white hover:bg-purple-700"
                                    : "border border-white/40 text-white backdrop-blur-md hover:bg-white hover:text-black"
                                    }`}
                            >
                                {isSaved ? "❤️ Added" : "+ Add List"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {showTrailer && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-5 backdrop-blur-md">
                    <div className="relative w-full max-w-2xl rounded-3xl border border-white/10 bg-zinc-950 p-6 text-white shadow-2xl shadow-red-500/20">
                        <button
                            onClick={() => setShowTrailer(false)}
                            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-xl hover:bg-white hover:text-black"
                        >
                            ×
                        </button>

                        <div className="mb-5">
                            <h2 className="text-3xl font-black">▶ {movie.Title} Trailer</h2>
                            <p className="mt-2 text-sm text-gray-400">
                                Open the official trailer search on YouTube.
                            </p>
                        </div>

                        <div className="mb-6 flex h-64 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-red-600/30 via-black to-purple-700/30">
                            <div className="text-center">
                                <div className="mb-4 text-6xl">▶</div>
                                <p className="text-gray-300">Trailer preview modal</p>
                            </div>
                        </div>

                        <a
                            href={`https://www.youtube.com/results?search_query=${movie.Title}+official+trailer`}
                            target="_blank"
                            rel="noreferrer"
                            className="block rounded-full bg-red-600 px-8 py-3 text-center font-bold text-white transition hover:bg-red-700"
                        >
                            Open Trailer on YouTube
                        </a>
                    </div>
                </div>
            )}
        </section>
    );
};

export default MovieDetails;
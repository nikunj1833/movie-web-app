import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { auth } from "../firebase";
import AuthModal from "../components/AuthModal";

const MovieDetails = ({ darkMode }) => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [isSaved, setIsSaved] = useState(false);
    const [showAuth, setShowAuth] = useState(false);

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
        if (!auth.currentUser) {
            setShowAuth(true);
            return;
        }
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

    const handleTrailer = () => {
        const query = `${movie.Title} official trailer`;

        window.open(
            `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`,
            "_blank"
        );
    };

    if (!movie) {
        return (
            <div
                className={`flex min-h-screen items-center justify-center ${darkMode
                    ? "bg-black text-white"
                    : "bg-white text-black"
                    }`}
            >
                Loading Movie...
            </div>
        );
    }

    return (
        <section
            className={`relative min-h-screen bg-cover bg-center transition-all duration-500 ${darkMode
                ? "text-white"
                : "text-black"
                }`}
            style={{
                backgroundImage: `url(${movie.Poster !== "N/A" ? movie.Poster : ""})`,
            }}
        >
            <div
                className={`absolute inset-0 ${darkMode
                    ? "bg-black/80"
                    : "bg-white/80"
                    }`}
            ></div>
            <div
                className={`absolute inset-0 ${darkMode
                    ? "bg-gradient-to-r from-black via-black/80 to-transparent"
                    : "bg-gradient-to-r from-white via-white/70 to-transparent"
                    }`}
            />

            <div className="relative z-10 px-8 py-10 md:px-20">
                <Link
                    to="/"
                    className={`mb-10 inline-block rounded-full px-5 py-2 text-sm font-semibold backdrop-blur-md transition ${darkMode
                        ? "bg-white/10 hover:bg-white hover:text-black"
                        : "bg-black/10 hover:bg-black hover:text-white"
                        }`}
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
                        className="rounded-3xl shadow-2xl shadow-red-500500/30"
                    />

                    <div>
                        <p className="mb-3 text-sm font-bold uppercase tracking-[4px] text-red-500">
                            Movie Details
                        </p>

                        <h1
                            className={`mb-4 max-w-4xl text-5xl font-black md:text-7xl ${darkMode ? "text-white" : "text-black"
                                }`}
                        >
                            {movie.Title}
                        </h1>

                        <div className="mb-6 flex flex-wrap gap-3 text-sm font-semibold">
                            <span
                                className={`rounded-full px-4 py-2 backdrop-blur-md ${darkMode
                                    ? "bg-white/10 text-white"
                                    : "bg-black/10 text-black"
                                    }`}
                            >
                                ⭐ {movie.imdbRating}
                            </span>
                            <span
                                className={`rounded-full px-4 py-2 backdrop-blur-md ${darkMode
                                    ? "bg-white/10 text-white"
                                    : "bg-black/10 text-black"
                                    }`}
                            >
                                {movie.Year}
                            </span>
                            <span
                                className={`rounded-full px-4 py-2 backdrop-blur-md ${darkMode
                                    ? "bg-white/10 text-white"
                                    : "bg-black/10 text-black"
                                    }`}
                            >
                                {movie.Runtime}
                            </span>

                            <span
                                className={`rounded-full px-4 py-2 backdrop-blur-md ${darkMode
                                    ? "bg-white/10 text-white"
                                    : "bg-black/10 text-black"
                                    }`}
                            >
                                {movie.Rated}
                            </span>
                        </div>

                        <p
                            className={`mb-6 max-w-3xl text-lg leading-8 ${darkMode
                                ? "text-gray-300"
                                : "text-gray-700"
                                }`}
                        >
                            {movie.Plot}
                        </p>
                        <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-5">
                            <div className={`rounded-2xl p-4 backdrop-blur-md transition-all duration-500 ${darkMode
                                ? "border border-white/10 bg-white/5"
                                : "border border-zinc-200 bg-white shadow-md"
                                }`}>
                                <p className="text-xs text-gray-400">IMDb Rating</p>
                                <h3 className="mt-1 text-xl font-bold text-yellow-400">
                                    ⭐ {movie.imdbRating}
                                </h3>
                            </div>

                            <div className={`rounded-2xl p-4 backdrop-blur-md transition-all duration-500 ${darkMode
                                ? "border border-white/10 bg-white/5"
                                : "border border-zinc-200 bg-white shadow-md"
                                }`}>
                                <p className="text-xs text-gray-400">Runtime</p>
                                <h3 className="mt-1 text-xl font-bold">
                                    🎬 {movie.Runtime}
                                </h3>
                            </div>

                            <div className={`rounded-2xl p-4 backdrop-blur-md transition-all duration-500 ${darkMode
                                ? "border border-white/10 bg-white/5"
                                : "border border-zinc-200 bg-white shadow-md"
                                }`}>
                                <p className="text-xs text-gray-400">Year</p>
                                <h3 className="mt-1 text-xl font-bold">
                                    📅 {movie.Year}
                                </h3>
                            </div>

                            <div className={`rounded-2xl p-4 backdrop-blur-md transition-all duration-500 ${darkMode
                                ? "border border-white/10 bg-white/5"
                                : "border border-zinc-200 bg-white shadow-md"
                                }`}>
                                <p className="text-xs text-gray-400">Country</p>
                                <h3 className="mt-1 text-xl font-bold">
                                    🌍 {movie.Country}
                                </h3>
                            </div>

                            <div className={`rounded-2xl p-4 backdrop-blur-md transition-all duration-500 ${darkMode
                                ? "border border-white/10 bg-white/5"
                                : "border border-zinc-200 bg-white shadow-md"
                                }`}>
                                <p className="text-xs text-gray-400">Box Office</p>
                                <h3 className="mt-1 text-xl font-bold text-green-400">
                                    💰 {movie.BoxOffice || "N/A"}
                                </h3>
                            </div>
                        </div>

                        <div
                            className={`mb-8 grid gap-3 text-sm md:grid-cols-2 ${darkMode
                                ? "text-gray-300"
                                : "text-gray-700"
                                }`}
                        >
                            <p>
                                <span
                                    className={`font-bold ${darkMode
                                        ? "text-white"
                                        : "text-black"
                                        }`}
                                > Genre:</span>{" "}
                                {movie.Genre}
                            </p>

                            <p>
                                <span
                                    className={`font-bold ${darkMode
                                        ? "text-white"
                                        : "text-black"
                                        }`}
                                > Director:</span>{" "}
                                {movie.Director}
                            </p>

                            <p>
                                <span
                                    className={`font-bold ${darkMode
                                        ? "text-white"
                                        : "text-black"
                                        }`}
                                > Actors:</span>{" "}
                                {movie.Actors}
                            </p>

                            <p>
                                <span
                                    className={`font-bold ${darkMode
                                        ? "text-white"
                                        : "text-black"
                                        }`}
                                > Language:</span>{" "}
                                {movie.Language}
                            </p>

                            <p>
                                <span
                                    className={`font-bold ${darkMode
                                        ? "text-white"
                                        : "text-black"
                                        }`}
                                > Country:</span>{" "}
                                {movie.Country}
                            </p>

                            <p>
                                <span
                                    className={`font-bold ${darkMode
                                        ? "text-white"
                                        : "text-black"
                                        }`}
                                > Box Office:</span>{" "}
                                {movie.BoxOffice}
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <button
                                onClick={handleTrailer}
                                className="rounded-full bg-red-600 px-8 py-3 font-bold text-white transition hover:scale-105 hover:bg-red-700"
                            >
                                ▶ Watch Trailer
                            </button>

                            <button
                                onClick={handleMyList}
                                className={`rounded-full px-8 py-3 font-bold transition ${isSaved
                                    ? "text-red-600 text-white hover:text-red-700"
                                    : darkMode
                                        ? "border border-white/40 text-white backdrop-blur-md hover:bg-white hover:text-black"
                                        : "border border-black/20 text-black bg-white/60 hover:bg-black hover:text-white"
                                    }`}
                            >
                                {isSaved ? "❤️ Added" : "+ Add List"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>


            {showAuth && (
                <AuthModal setShowAuth={setShowAuth} />
            )}
        </section>
    );
};

export default MovieDetails;
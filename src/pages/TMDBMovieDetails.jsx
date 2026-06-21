
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const TMDBMovieDetails = () => {
    const { id } = useParams();

    const [movie, setMovie] = useState(null);

    const handleTrailer = async () => {
        try {
            const res = await fetch(
                `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`
            );

            const data = await res.json();

            const trailer = data.results?.find(
                (video) =>
                    video.site === "YouTube" &&
                    video.type === "Trailer"
            );

            if (trailer) {
                window.open(
                    `https://www.youtube.com/watch?v=${trailer.key}`,
                    "_blank"
                );
            } else {
                alert("Trailer not found");
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const res = await fetch(
                    `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
                );

                const data = await res.json();

                setMovie(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchMovie();
    }, [id]);

    if (!movie) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-black text-white">
                Loading...
            </div>
        );
    }

    return (
        <section
            className="relative min-h-screen bg-cover bg-center text-white"
            style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
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
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        className="rounded-3xl shadow-2xl"
                    />

                    <div>

                        <p className="mb-3 text-sm font-bold uppercase tracking-[4px] text-red-500">
                            Movie Details
                        </p>

                        <h1 className="mb-4 text-5xl font-black md:text-7xl">
                            {movie.title}
                        </h1>

                        <div className="mb-6 flex flex-wrap gap-3">

                            <span className="rounded-full bg-white/10 px-4 py-2 backdrop-blur-md">
                                ⭐ {movie.vote_average}
                            </span>

                            <span className="rounded-full bg-white/10 px-4 py-2 backdrop-blur-md">
                                📅 {movie.release_date}
                            </span>

                            <span className="rounded-full bg-white/10 px-4 py-2 backdrop-blur-md">
                                🎬 {movie.runtime} min
                            </span>

                            <span className="rounded-full bg-white/10 px-4 py-2 backdrop-blur-md">
                                🌎 {movie.original_language?.toUpperCase()}
                            </span>

                        </div>

                        <p className="mb-8 max-w-4xl text-lg leading-8 text-gray-300">
                            {movie.overview}
                        </p>

                        <div className="mb-8 flex flex-wrap gap-3">

                            {movie.genres?.map((genre) => (
                                <span
                                    key={genre.id}
                                    className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold"
                                >
                                    {genre.name}
                                </span>
                            ))}

                        </div>

                        <div className="flex flex-wrap gap-4">

                            <button
                                onClick={handleTrailer}
                                className="rounded-full bg-red-600 px-8 py-3 font-bold text-white transition hover:scale-105 hover:bg-red-700"
                            >
                                ▶ Watch Trailer
                            </button>

                            <button
                                className="rounded-full border border-white/40 px-8 py-3 font-bold backdrop-blur-md transition hover:bg-white hover:text-black"
                            >
                                + Add List
                            </button>

                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
};

export default TMDBMovieDetails;


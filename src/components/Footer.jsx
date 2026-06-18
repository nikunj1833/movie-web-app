import { Link } from "react-router-dom";

function Footer() {
    return (<footer className="relative mt-16 overflow-hidden border-t border-white/10 bg-black text-white">


        <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-transparent via-red-500 to-transparent" />

        <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-14">

            <div className="grid gap-8 text-center md:grid-cols-4 md:text-left">

                <div>
                    <h2 className="text-3xl font-black tracking-[2px]">
                        Movie<span className="text-red-500">Max</span>
                    </h2>

                    <p className="mt-3 text-xs leading-6 text-gray-400 md:text-sm">
                        Discover trending movies, explore new genres,
                        and build your personal watchlist.
                    </p>
                </div>

                <div>
                    <h3 className="mb-3 text-xl font-bold">
                        Quick Links
                    </h3>

                    <div className="flex flex-col gap-3 text-gray-400">
                        <Link
                            to="/"
                            className="transition hover:text-red-500"
                        >
                            Home
                        </Link>

                        <Link
                            to="/my-list"
                            className="transition hover:text-red-500"
                        >
                            My List
                        </Link>

                        <button className="transition hover:text-red-500">
                            Trending
                        </button>

                        <button className="transition hover:text-red-500">
                            Popular
                        </button>
                    </div>
                </div>

                <div>
                    <h3 className="mb-5 text-lg font-semibold">
                        Categories
                    </h3>

                    <div className="flex flex-col gap-2 text-gray-400">
                        <span className="cursor-pointer transition hover:text-red-500">
                            Action
                        </span>

                        <span className="cursor-pointer transition hover:text-red-500">
                            Comedy
                        </span>

                        <span className="cursor-pointer transition hover:text-red-500">
                            Horror
                        </span>

                        <span className="cursor-pointer transition hover:text-red-500">
                            Sci-Fi
                        </span>
                    </div>
                </div>

                <div>
                    <h3 className="mb-5 text-lg font-semibold">
                        Follow Us
                    </h3>

                    <div className="flex justify-center gap-3 md:justify-start">
                        <button className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xl transition hover:scale-110 hover:border-red-500 hover:text-red-500">
                            📷
                        </button>

                        <button className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xl transition hover:scale-110 hover:border-red-500 hover:text-red-500">
                            🐦
                        </button>

                        <button className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xl transition hover:scale-110 hover:border-red-500 hover:text-red-500">
                            ▶️
                        </button>

                        <button className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xl transition hover:scale-110 hover:border-red-500 hover:text-red-500">
                            🎬
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-14 grid grid-cols-1 gap-6 border-t border-white/10 pt-10 text-center sm:grid-cols-3">

                <div>
                    <h3 className="text-2xl font-bold text-red-500">
                        50K+
                    </h3>
                    <p className="text-sm text-gray-500">
                        Movies
                    </p>
                </div>

                <div>
                    <h3 className="text-2xl font-bold text-red-500">
                        10K+
                    </h3>
                    <p className="text-sm text-gray-500">
                        Users
                    </p>
                </div>

                <div>
                    <h3 className="text-2xl font-bold text-red-500">
                        25+
                    </h3>
                    <p className="text-sm text-gray-500">
                        Genres
                    </p>
                </div>

            </div>

            <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-zinc-500">
                © 2026 MovieMax. Built with ❤️ for movie lovers.
            </div>

        </div>
    </footer >
    );
}

export default Footer;

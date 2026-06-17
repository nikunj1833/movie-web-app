import { Link } from "react-router-dom";

function Footer() {
return ( <footer className="relative mt-24 overflow-hidden border-t border-white/10 bg-gradient-to-b from-zinc-950 via-black to-black text-white">


        <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-transparent via-purple-500 to-transparent" />

        <div className="mx-auto max-w-7xl px-6 py-14">

            <div className="grid gap-12 md:grid-cols-4">

                <div>
                    <h2 className="text-3xl font-extrabold">
                        Movie<span className="text-purple-500">Max</span>
                    </h2>

                    <p className="mt-4 text-sm leading-6 text-gray-400">
                        Discover trending movies, explore new genres,
                        and build your personal watchlist.
                    </p>
                </div>

                <div>
                    <h3 className="mb-5 text-lg font-semibold">
                        Quick Links
                    </h3>

                    <div className="flex flex-col gap-3 text-gray-400">
                        <Link
                            to="/"
                            className="transition hover:text-purple-400"
                        >
                            Home
                        </Link>

                        <Link
                            to="/my-list"
                            className="transition hover:text-purple-400"
                        >
                            My List
                        </Link>

                        <button className="text-left transition hover:text-purple-400">
                            Trending
                        </button>

                        <button className="text-left transition hover:text-purple-400">
                            Popular
                        </button>
                    </div>
                </div>

                <div>
                    <h3 className="mb-5 text-lg font-semibold">
                        Categories
                    </h3>

                    <div className="flex flex-col gap-3 text-gray-400">
                        <span className="cursor-pointer transition hover:text-purple-400">
                            Action
                        </span>

                        <span className="cursor-pointer transition hover:text-purple-400">
                            Comedy
                        </span>

                        <span className="cursor-pointer transition hover:text-purple-400">
                            Horror
                        </span>

                        <span className="cursor-pointer transition hover:text-purple-400">
                            Sci-Fi
                        </span>
                    </div>
                </div>

                <div>
                    <h3 className="mb-5 text-lg font-semibold">
                        Follow Us
                    </h3>

                    <div className="flex gap-4">
                        <button className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xl transition hover:scale-110 hover:border-purple-500">
                            📷
                        </button>

                        <button className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xl transition hover:scale-110 hover:border-purple-500">
                            🐦
                        </button>

                        <button className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xl transition hover:scale-110 hover:border-purple-500">
                            ▶️
                        </button>

                        <button className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xl transition hover:scale-110 hover:border-purple-500">
                            🎬
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-14 grid grid-cols-3 gap-4 border-t border-white/10 pt-10 text-center">

                <div>
                    <h3 className="text-2xl font-bold text-purple-400">
                        50K+
                    </h3>
                    <p className="text-sm text-gray-500">
                        Movies
                    </p>
                </div>

                <div>
                    <h3 className="text-2xl font-bold text-purple-400">
                        10K+
                    </h3>
                    <p className="text-sm text-gray-500">
                        Users
                    </p>
                </div>

                <div>
                    <h3 className="text-2xl font-bold text-purple-400">
                        25+
                    </h3>
                    <p className="text-sm text-gray-500">
                        Genres
                    </p>
                </div>

            </div>

            <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-gray-500">
                © 2026 MovieMax. All Rights Reserved.
            </div>

        </div>
    </footer>
);
}

export default Footer;

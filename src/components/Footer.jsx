import { Link } from "react-router-dom";
import {
    FaInstagram,
    FaYoutube,
    FaFacebookF,
} from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";

function Footer({ darkMode }) {
    return (<footer
        className={`relative mt-16 overflow-hidden border-t transition-all duration-500
  ${darkMode
                ? "border-white/10 bg-black text-white"
                : "border-zinc-300 bg-white text-black"
            }`}
    >


        <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-transparent via-red-500 to-transparent" />

        <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-14">

            <div className="grid gap-8 text-center md:grid-cols-4 md:text-left">

                <div>
                    <Link to="/">
                        <h2 className="text-3xl font-black tracking-[2px] cursor-pointer">
                            Movie<span className="text-red-500">Max</span>
                        </h2>
                    </Link>

                    <p
                        className={`mt-3 text-xs leading-6 md:text-sm ${darkMode ? "text-gray-400" : "text-zinc-600"
                            }`}
                    >
                        Discover trending movies, explore new genres,
                        and build your personal watchlist.
                    </p>
                </div>

                <div>
                    <h3 className="mb-3 text-xl font-bold">
                        Quick Links
                    </h3>

                    <div className="flex flex-col gap-3 text-gray-400 items-center md:items-start">
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

                        <Link
                            to="/"
                            className="transition hover:text-red-500"
                        >
                            Trending
                        </Link>

                        <Link
                            to="/"
                            className="transition hover:text-red-500"
                        >
                            Popular
                        </Link>
                    </div>
                </div>

                <div>
                    <h3 className="mb-5 text-lg font-semibold">
                        Categories
                    </h3>

                    <div
                        className={`flex flex-col gap-2 ${darkMode ? "text-gray-400" : "text-zinc-600"
                            }`}
                    >
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

                        <a
                            href="https://instagram.com/rishi_solanki_16"
                            className={`flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 hover:scale-110 hover:border-red-500 hover:text-red-500
${darkMode
                                    ? "border-white/10 bg-white/5"
                                    : "border-zinc-300 bg-zinc-100"
                                }`}
                        >
                            <FaInstagram />
                        </a>

                        <a
                            href="https://www.youtube.com/"
                            className={`flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 hover:scale-110 hover:border-red-500 hover:text-red-500
${darkMode
                                    ? "border-white/10 bg-white/5"
                                    : "border-zinc-300 bg-zinc-100"
                                }`}
                        >
                            <FaYoutube />
                        </a>

                        <a
                            href="https://www.facebook.com/"
                            className={`flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 hover:scale-110 hover:border-red-500 hover:text-red-500
${darkMode
                                    ? "border-white/10 bg-white/5"
                                    : "border-zinc-300 bg-zinc-100"
                                }`}
                        >
                            <FaFacebookF />
                        </a>

                        <a
                            href="https://www.x.com/"
                            className={`flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 hover:scale-110 hover:border-red-500 hover:text-red-500
${darkMode
                                    ? "border-white/10 bg-white/5"
                                    : "border-zinc-300 bg-zinc-100"
                                }`}
                        >
                            <FaXTwitter />
                        </a>

                    </div>
                </div>
            </div>

            <div
                className={`mt-14 grid grid-cols-1 gap-6 border-t pt-10 text-center sm:grid-cols-3 ${darkMode ? "border-white/10" : "border-zinc-300"
                    }`}
            >

                <div>
                    <h3 className="text-2xl font-bold text-red-500">
                        50K+
                    </h3>
                    <p
                        className={`text-sm ${darkMode ? "text-gray-500" : "text-zinc-600"
                            }`}
                    >
                        Movies
                    </p>
                </div>

                <div>
                    <h3 className="text-2xl font-bold text-red-500">
                        10K+
                    </h3>
                    <p
                        className={`text-sm ${darkMode ? "text-gray-500" : "text-zinc-600"
                            }`}
                    >
                        Users
                    </p>
                </div>

                <div>
                    <h3 className="text-2xl font-bold text-red-500">
                        25+
                    </h3>
                    <p
                        className={`text-sm ${darkMode ? "text-gray-500" : "text-zinc-600"
                            }`}
                    >
                        Genres
                    </p>
                </div>

            </div>

            <div
                className={`mt-10 border-t pt-6 text-center text-sm ${darkMode
                        ? "border-white/10 text-zinc-500"
                        : "border-zinc-300 text-zinc-600"
                    }`}
            >
                © 2026 MovieMax. Built with ❤️ for movie lovers.
            </div>

        </div>
    </footer >
    );
}

export default Footer;

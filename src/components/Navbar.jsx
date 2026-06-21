import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { auth } from "../firebase";
import AuthModal from "./AuthModal";
import { onAuthStateChanged, signOut } from "firebase/auth";

const Navbar = ({
    setSearch,
    darkMode,
    setDarkMode,
}) => {
    const [input, setInput] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showAuth, setShowAuth] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [showProfile, setShowProfile] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [authLoading, setAuthLoading] = useState(false);
    const [loadingText, setLoadingText] = useState("");

    const API_KEY = "1a084661";

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        });
        return () => unsubscribe();
    }, []);

    const handleSearch = () => {
        if (input.trim() === "") return;
        setSearch(input);
        setSuggestions([]);
        setInput("");
    };

    const handleLogout = async () => {
        await signOut(auth); // ✅ NOW WORKS
        setShowProfile(false);
    };

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (input.trim().length < 2) {
                setSuggestions([]);
                return;
            }
            const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${input}`);
            const data = await res.json();
            if (data.Response === "True") {
                setSuggestions(data.Search.slice(0, 5));
            } else {
                setSuggestions([]);
            }
        };
        fetchSuggestions();
    }, [input]);

    return (
        <>
            <motion.header
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className={`fixed left-0 top-0 z-50 w-full px-4 py-4 backdrop-blur-lg md:px-8 ${darkMode
                    ? "text-white bg-black/30"
                    : "text-black bg-white/70"
                    }`}
            >
                <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 md:gap-8">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setMobileMenu(!mobileMenu)}
                            className={`block text-3xl font-bold hover:text-red-500 transition-all duration-300 md:hidden ${darkMode ? "text-white" : "text-black"
                                }`}
                        >
                            ☰
                        </button>

                        <Link
                            to="/"
                            onClick={() => setSearch("")}
                            className="group"
                        >
                            <div className="transition-all duration-700 ease-out group-hover:scale-110">
                                <h1 className="text-xl font-black tracking-[2px] sm:text-2xl md:text-4xl text-red-500 drop-shadow-[0_0_15px_rgba(220,38,38,0.8)] transition-all duration-500 group-hover:text-white">
                                    MOVIEMAX
                                </h1>

                                <p className="hidden sm:block text-[9px] uppercase tracking-[5px] text-white transition-all duration-500 group-hover:text-red-500">
                                    CINEMA EXPERIENCE
                                </p>
                            </div>
                        </Link>
                    </div>

                    <nav className="hidden gap-8 text-sm font-semibold md:flex">
                        {["Drama", "Action", "Comedy", "Horror", "Sci-Fi"].map((item) => (
                            <motion.button
                                key={item}
                                whileHover={{ y: -2, scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setSearch(item.toLowerCase())}
                                className="transition hover:text-red-500"
                            >
                                {item}
                            </motion.button>
                        ))}


                    </nav>
                    <div className="flex items-center gap-2 shrink-0">
                        <div className="relative">
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className={`flex items-center rounded-full p-1 backdrop-blur-md ${darkMode
                                    ? "bg-white/20"
                                    : "bg-black/10"
                                    }`}
                            >
                                <input
                                    type="text"
                                    placeholder="Search movies..."
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                                    className={`w-14 sm:w-32 md:w-56 bg-transparent px-2 py-2 text-xs sm:text-sm outline-none ${darkMode
                                        ? "text-white placeholder:text-white/70"
                                        : "text-black placeholder:text-black/50"
                                        }`}
                                />

                                <motion.button
                                    whileTap={{ scale: 0.92 }}
                                    onClick={handleSearch}
                                    className="rounded-full bg-white px-3 py-2 text-sm font-bold text-black"
                                >
                                    <span className="hidden sm:block">Search</span>
                                    <span className="sm:hidden">🔍</span>
                                </motion.button>
                            </motion.div>

                            {suggestions.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10, scale: 0.97 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ duration: 0.25 }}
                                    className="absolute right-0 top-14 w-[300px] overflow-hidden rounded-2xl bg-black/80 backdrop-blur-xl sm:w-[350px]"
                                >
                                    {suggestions.map((movie) => (
                                        <button
                                            key={movie.imdbID}
                                            onClick={() => {
                                                setSearch(movie.Title);
                                                setInput("");
                                                setSuggestions([]);
                                            }}
                                            className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-white/10"
                                        >
                                            <img
                                                src={
                                                    movie.Poster !== "N/A"
                                                        ? movie.Poster
                                                        : "https://placehold.co/80x100?text=No+Image"
                                                }
                                                alt={movie.Title}
                                                className="h-14 w-10 rounded object-cover"
                                            />

                                            <div>
                                                <h4 className="line-clamp-1 text-sm font-bold">
                                                    {movie.Title}
                                                </h4>
                                                <p className="text-xs text-gray-400">
                                                    {movie.Year}
                                                </p>
                                            </div>
                                        </button>


                                    ))}
                                </motion.div>
                            )}
                        </div>
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500 text-white"
                        >
                            {darkMode ? "☀️" : "🌙"}
                        </button>

                        <div className="relative">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() =>
                                    currentUser
                                        ? setShowProfile(!showProfile)
                                        : setShowAuth(true)
                                }
                                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white ${darkMode
                                    ? "bg-blue-600"
                                    : "bg-blue-500"
                                    }`}
                            >
                                {currentUser
                                    ? (currentUser.displayName || currentUser.email)
                                        ?.charAt(0)
                                        .toUpperCase()
                                    : "👤"}
                            </motion.button>

                            {showProfile && currentUser && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    className="absolute right-0 top-14 w-64 rounded-2xl bg-black/80 p-4 shadow-2xl backdrop-blur-xl"
                                >
                                    <h3 className="font-bold">
                                        {currentUser.displayName || "User"}
                                    </h3>

                                    <p className="mt-1 break-all text-xs text-gray-400">
                                        {currentUser.email}
                                    </p>

                                    <Link
                                        to="/my-list"
                                        onClick={() => setShowProfile(false)}
                                        className="mt-4 block rounded-xl bg-white/10 px-4 py-2 text-sm hover:bg-white/20"
                                    >
                                        ❤️ My List
                                    </Link>

                                    <button
                                        onClick={handleLogout}
                                        className="mt-3 w-full rounded-xl bg-red-600 px-4 py-2 text-sm font-bold hover:bg-red-700"
                                    >
                                        Logout
                                    </button>
                                </motion.div>
                            )}
                        </div>

                    </div>
                </div>
            </motion.header>

            {mobileMenu && (
                <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="
fixed
left-0
top-0
z-50
h-screen
w-[280px]
bg-black
border-r
border-white/10
p-6
text-white
shadow-2xl
md:hidden
"
                >
                    <div className="mx-auto flex max-w-sm flex-col gap-5">
                        <div className="mb-8 flex items-center justify-between">
                            <h2 className="text-2xl font-black text-red-500">
                                MOVIEMAX
                            </h2>

                            <button
                                onClick={() => setMobileMenu(false)}
                                className="text-3xl"
                            >
                                ✕
                            </button>
                        </div>
                        {["Drama", "Action", "Comedy", "Horror", "Sci-Fi"].map((item) => (
                            <button
                                key={item}
                                onClick={() => {
                                    setSearch(item.toLowerCase());
                                    setMobileMenu(false);
                                }}
                                className="rounded-xl px-4 py-3 text-center text-lg font-medium hover:bg-white/10"
                            >
                                {item}
                            </button>
                        ))}
                        <Link
                            to="/my-list"
                            onClick={() => setMobileMenu(false)}
                            className="rounded-xl px-4 py-3 text-center text-lg font-medium hover:bg-white/10"
                        >
                            ❤️ My List
                        </Link>
                    </div>
                </motion.div>
            )}

            {showAuth && <AuthModal setShowAuth={setShowAuth} />}
        </>
    );
};

export default Navbar;
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import AuthModal from "./AuthModal";

const Navbar = ({ setSearch }) => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showAuth, setShowAuth] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showProfile, setShowProfile] = useState(false);

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
    await signOut(auth);
    setShowProfile(false);
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (input.trim().length < 2) {
        setSuggestions([]);
        return;
      }

      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${input}`
      );

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
        className="fixed left-0 top-0 z-50 flex h-[70px] w-full items-center gap-6 px-8 text-white backdrop-blur-sm"
      >
        <div className="cursor-pointer text-2xl">☰</div>

        <Link
          to="/"
          onClick={() => setSearch("")}
          className="text-2xl font-extrabold tracking-tight"
        >
          MovieMax
        </Link>

        <nav className="flex gap-6 text-sm font-semibold">
          {["Drama", "Action", "Comedy", "Horror", "Sci-Fi"].map((item) => (
            <motion.button
              key={item}
              whileHover={{ y: -2, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSearch(item.toLowerCase())}
              className="transition hover:text-purple-400"
            >
              {item}
            </motion.button>
          ))}

          <motion.div whileHover={{ y: -2, scale: 1.05 }}>
            <Link to="/my-list" className="hover:text-purple-400">
              ❤️ My List
            </Link>
          </motion.div>
        </nav>

        <div className="relative ml-auto">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center rounded-full bg-white/15 p-1 backdrop-blur-md"
          >
            <input
              type="text"
              placeholder="Search movies..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="w-44 bg-transparent px-4 py-2 text-sm text-white outline-none placeholder:text-gray-300"
            />

            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={handleSearch}
              className="rounded-full bg-white px-4 py-2 text-sm font-bold text-black"
            >
              Search
            </motion.button>
          </motion.div>

          {suggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="absolute right-0 top-14 w-[330px] overflow-hidden rounded-2xl bg-zinc-900 shadow-2xl"
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
                    <p className="text-xs text-gray-400">{movie.Year}</p>
                  </div>
                </button>
              ))}
            </motion.div>
          )}
        </div>

        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() =>
              currentUser ? setShowProfile(!showProfile) : setShowAuth(true)
            }
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-sm font-bold backdrop-blur-md"
          >
            {currentUser
              ? currentUser.displayName?.charAt(0).toUpperCase() ||
                currentUser.email?.charAt(0).toUpperCase()
              : "👤"}
          </motion.button>

          {showProfile && currentUser && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="absolute right-0 top-14 w-64 rounded-2xl bg-zinc-900 p-4 shadow-2xl"
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
      </motion.header>

      {showAuth && <AuthModal setShowAuth={setShowAuth} />}
    </>
  );
};

export default Navbar;
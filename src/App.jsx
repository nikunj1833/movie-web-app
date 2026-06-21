import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import MovieGrid from "./components/MovieGrid";
import TrendingRows from "./components/TrendingRows";
import MoodPicker from "./components/MoodPicker";
import MovieDetails from "./pages/MovieDetails";
import MyList from "./pages/MyList";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import TMDBMovieDetails from "./pages/TMDBMovieDetails";


function Home({
    darkMode,
    setDarkMode
}) {
    const [search, setSearch] = useState("");



    return (
        <div
            className={`relative min-h-screen flex flex-col transition-all duration-500 ${darkMode
                ? "bg-black text-white"
                : "bg-white text-black"
                }`}
        >
            <Navbar
                setSearch={setSearch}
                darkMode={darkMode}
                setDarkMode={setDarkMode}
            />

            <div className="flex-grow">
                {search ? (
                    <MovieGrid
                        search={search}
                        darkMode={darkMode}
                    />
                ) : (
                    <>
                        <HeroSection
                            setSearch={setSearch}
                            darkMode={darkMode}
                        />

                        <MoodPicker darkMode={darkMode} />

                        <TrendingRows darkMode={darkMode} />
                    </>
                )}
            </div>

            <Footer darkMode={darkMode} />
        </div>
    );
}

function App() {
    const [loading, setLoading] = useState(true);
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("theme") !== "light";
    });


    useEffect(() => {
        localStorage.setItem(
            "theme",
            darkMode ? "dark" : "light"
        );
    }, [darkMode]);



    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return <Loader />;
    }

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <Home
                        darkMode={darkMode}
                        setDarkMode={setDarkMode}
                    />
                }
            />
            <Route
                path="/my-list"
                element={<MyList darkMode={darkMode} />}
            />
            <Route
                path="/movie/:id"
                element={<MovieDetails darkMode={darkMode} />}
            />
            <Route
                path="/tmdb-movie/:id"
                element={<TMDBMovieDetails darkMode={darkMode} />}
            />
        </Routes>
    );
}

export default App;
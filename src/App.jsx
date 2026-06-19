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

function Home() {
    const [search, setSearch] = useState("");

    return (
        <div className="relative min-h-screen bg-black flex flex-col">
            <Navbar setSearch={setSearch} />

            <div className="flex-grow">
                {search ? (
                    <MovieGrid search={search} />
                ) : (
                    <>
                        <HeroSection setSearch={setSearch} />
                        <MoodPicker />
                        <TrendingRows />
                    </>
                )}
            </div>

            <Footer />
        </div>
    );
}

function App() {
    const [loading, setLoading] = useState(true);

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
            <Route path="/" element={<Home />} />
            <Route path="/my-list" element={<MyList />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
    );
}

export default App;
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import thor from "../assets/thor.jpg";

const heroMovies = [
  {
    title: "THOR",
    tag: "Marvel Studios",
    desc: "The God of Thunder enters a dangerous battle above the clouds, carrying his mighty hammer into a world full of power, storms and destiny.",
    img: thor,
  },
  {
    title: "AVENGERS",
    tag: "Earth's Mightiest Heroes",
    desc: "Powerful heroes unite to protect the world from a dangerous enemy and save humanity from destruction.",
    img: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?q=80&w=1600",
  },
  {
    title: "JOKER",
    tag: "Dark Crime Drama",
    desc: "A broken man slowly transforms into Gotham's most unpredictable and dangerous criminal mind.",
    img: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?q=80&w=1600",
  },
  {
    title: "INTERSTELLAR",
    tag: "Sci-Fi Adventure",
    desc: "A team of explorers travels beyond the stars to find a new future for humanity.",
    img: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1600",
  },
  {
    title: "DARK KNIGHT",
    tag: "Superhero Thriller",
    desc: "A masked hero faces chaos in a city where crime, fear and justice collide.",
    img: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?q=80&w=1600",
  },
];

const genres = ["Action", "Drama", "Sci-Fi", "Comedy", "Horror", "Romance"];

const HeroSection = ({ setSearch, darkMode }) => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % heroMovies.length);
    }, 7000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className={`relative h-[85vh] w-full overflow-hidden transition-all duration-700 ${darkMode
        ? "bg-black text-white"
        : "bg-zinc-100 text-black"
        }`}
    >
      {heroMovies.map((movie, index) => (
        <motion.div
          key={movie.title}
          initial={false}
          animate={{
            opacity: active === index ? 1 : 0,
            scale: active === index ? 1 : 1.08,
          }}
          transition={{ duration: 1.3, ease: "easeInOut" }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${movie.img})` }}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/65 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30"></div>

      <div className="relative z-10 flex h-full items-center px-8 md:px-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -25 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mt-16 max-w-xl"
          >
            <motion.p
              initial={{ opacity: 0, x: -25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="mb-3 text-sm font-bold uppercase tracking-[4px] text-gray-300"
            >
              {heroMovies[active].tag}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, x: -35 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25, duration: 0.7 }}
              className="mb-3 text-5xl font-black md:text-7xl"
            >
              {heroMovies[active].title}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, x: -25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="mb-4 flex gap-3 text-sm font-semibold text-gray-300"
            >
              <span>IMDb 7.8</span>
              <span>2024</span>
              <span>Action</span>
              <span>13+</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              className="mb-7 max-w-md text-sm leading-6 text-gray-200 md:text-base"
            >
              {heroMovies[active].desc}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.6 }}
              className="flex gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.95 }}
                className={`rounded-full px-7 py-3 text-sm font-bold
${darkMode
                    ? "bg-white text-black"
                    : "bg-black text-white"
                  }`}
              >
                ▶ PLAY
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.95 }}
                className={`rounded-full px-7 py-3 text-sm font-bold transition
${darkMode
                    ? "border border-white/70 text-white hover:bg-white hover:text-black"
                    : "border border-black text-black hover:bg-black hover:text-white"
                  }`}
              >
                MORE INFO
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65, duration: 0.5 }}
              className="mt-7 flex gap-3"
            >
              {heroMovies.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActive(index)}
                  className={`h-2 rounded-full transition-all duration-500 ${active === index ? "w-9 bg-white" : "w-2 bg-white/40"
                    }`}
                ></button>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.6 }}
              className="mt-7 flex flex-wrap gap-3"
            >
              {genres.map((genre) => (
                <motion.button
                  key={genre}
                  whileHover={{ scale: 1.08, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSearch(genre.toLowerCase())}
                  className={`rounded-full px-4 py-2 text-sm font-semibold backdrop-blur-md transition
${darkMode
                      ? "border border-white/20 bg-white/10 text-white hover:bg-white hover:text-black"
                      : "border border-zinc-300 bg-white text-black hover:bg-black hover:text-white"
                    }`}
                >
                  {genre}
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default HeroSection; 
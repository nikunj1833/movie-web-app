import { motion } from "framer-motion";

function Loader() {
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black">
            <div className="text-center">

                <motion.h1
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="text-5xl md:text-7xl font-black tracking-[6px] text-red-600"
                >
                    MOVIEMAX
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-3 text-xs md:text-sm tracking-[8px] text-white"
                >
                    CINEMA EXPERIENCE
                </motion.p>

                <div className="mt-8 flex justify-center">
                    <div className="h-1 w-40 overflow-hidden rounded-full bg-zinc-800">
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: "100%" }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                            }}
                            className="h-full w-20 bg-red-600"
                        />
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Loader;
import React from "react";

const CategoryTabs = () => {
    return (
        <div className="absolute bottom-28 left-4 right-4 z-20 flex flex-wrap gap-4 text-xs font-bold text-white sm:left-8 sm:right-auto sm:text-sm md:left-20 md:gap-8">
            <button className="border-b-2 border-white pb-2">
                Originals
            </button>

            <button className="pb-2 text-gray-400 hover:text-white">
                TV Shows
            </button>

            <button className="pb-2 text-gray-400 hover:text-white">
                Movies
            </button>
        </div>
    );
};

export default CategoryTabs;
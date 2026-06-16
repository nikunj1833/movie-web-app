import React from "react";

const CategoryTabs = () => {
    return (
        <div className="absolute bottom-36 left-8 z-20 flex gap-8 text-sm font-bold text-white md:left-20">
            <button className="border-b-2 border-white pb-2">Originals</button>
            <button className="pb-2 text-gray-400 hover:text-white">TV Shows</button>
            <button className="pb-2 text-gray-400 hover:text-white">Movies</button>
        </div>
    );
};

export default CategoryTabs;
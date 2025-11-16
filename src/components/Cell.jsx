import React from "react";

const Cell = ({ isSnake, isFood }) => {
    let base = "w-5 h-5";
    
    if (isSnake) base += " bg-green-500";
    else if (isFood) base += " bg-pink-500 rounded-full";
    else base += " bg-gray-300";

    
    return <div className={base}></div>;
};

export default Cell;
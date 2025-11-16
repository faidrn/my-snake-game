import React from "react";

const Cell = ({ isSnake, isFood }) => {
    let classNaeme = "cell";
    if (isSnake) {
        classNaeme += " snake";
    } 
    if (isFood) {
        classNaeme += " food";
    }
    return <div className={classNaeme}></div>;
};

export default Cell;
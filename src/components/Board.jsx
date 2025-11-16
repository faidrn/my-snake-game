import React from "react";
import Cell from "./Cell";
import { BOARD_SIZE } from "../utils/gameLogic";

export default function Board({ snake, food }) {
    // Crear una matriz de BOARD_SIZE x BOARD_SIZE
    const grid = [];
    
    for (let y = 0; y < BOARD_SIZE; y++) {
        for (let x = 0; x < BOARD_SIZE; x++) {
            const isSnake = snake.some(([sx, sy]) => sx === x && sy === y);
            const isFood = food[0] === x && food[1] === y;
            grid.push({x, y, isSnake, isFood});
        }
    }

    return (
        <div
            className="grid gap-px bg-gray-700"
            style={{
                gridTemplateColumns: `repeat(${BOARD_SIZE}, 20px)`,
                width: BOARD_SIZE * 20,
            }}
        >
            {grid.map((cell) => (
                <Cell 
                    key={`${cell.x}-${cell.y}`} 
                    isSnake={cell.isSnake} 
                    isFood={cell.isFood} 
                />
            ))}
        </div>
    );
}
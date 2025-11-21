const Board = ({ snake, food, gridSize }) => {
    const isSnakeSegment = (x, y) => {
    return snake.findIndex(segment => segment.x === x && segment.y === y);
  };

  const isFood = (x, y) => {
    return food.x === x && food.y === y;
  };

  return (
    <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-2xl p-4 shadow-2xl border border-slate-700/50">
      <div
        className="grid gap-0.5 bg-slate-900/30 rounded-xl p-2"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          width: 'min(600px, 90vw)',
          height: 'min(600px, 90vw)',
        }}
      >
        {Array.from({ length: gridSize * gridSize }).map((_, index) => {
          const x = index % gridSize;
          const y = Math.floor(index / gridSize);
          const snakeIndex = isSnakeSegment(x, y);
          const isHead = snakeIndex === 0;
          const isTail = snakeIndex === snake.length - 1;
          const isBody = snakeIndex > 0 && snakeIndex < snake.length - 1;
          const hasFood = isFood(x, y);

          return (
            <div
              key={`${x}-${y}`}
              className={`
                aspect-square rounded-sm transition-all duration-100
                ${hasFood ? 'bg-linear-to-br from-red-400 to-pink-600 shadow-lg shadow-red-500/50 animate-pulse scale-110' : ''}
                ${isHead ? 'bg-linear-to-br from-green-400 to-emerald-600 shadow-lg shadow-green-500/50 scale-105' : ''}
                ${isBody ? 'bg-linear-to-br from-green-500 to-emerald-700' : ''}
                ${isTail ? 'bg-linear-to-br from-green-600 to-emerald-800' : ''}
                ${!hasFood && snakeIndex === -1 ? 'bg-slate-800/30' : ''}
              `}
            />
          );
        })}
      </div>

      {/* Grid glow effect */}
      <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-green-500/5 to-emerald-500/5 pointer-events-none" />
    </div>
  );
}

export default Board;
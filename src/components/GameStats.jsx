import { Trophy, Target } from "lucide-react";


const GameStats = ({ score, highScore, isPaused, gameOver }) => {
    return (
    <div className="flex flex-col gap-4 lg:w-48">
      {/* Score Card */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 shadow-xl">
        <div className="flex items-center gap-2 mb-2">
          <Target className="w-5 h-5 text-green-400" />
          <span className="text-slate-400 uppercase tracking-wide">Puntuación</span>
        </div>
        <div className="text-4xl text-green-400">{score}</div>
      </div>

      {/* High Score Card */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 shadow-xl">
        <div className="flex items-center gap-2 mb-2">
          <Trophy className="w-5 h-5 text-yellow-400" />
          <span className="text-slate-400 uppercase tracking-wide">Récord</span>
        </div>
        <div className="text-4xl text-yellow-400">{highScore}</div>
      </div>

      {/* Status Indicator */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50 shadow-xl">
        <div className="flex items-center gap-2">
          <div
            className={`w-3 h-3 rounded-full ${
              gameOver
                ? "bg-red-500 animate-pulse"
                : isPaused
                ? "bg-yellow-500"
                : "bg-green-500 animate-pulse"
            }`}
          />
          <span className="text-slate-300">
            {gameOver ? "Game Over" : isPaused ? "Pausado" : "Jugando"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default GameStats;
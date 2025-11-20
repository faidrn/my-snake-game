import { Trophy, RotateCcw } from 'lucide-react';
import { Button } from './ui/Button';

const GameOverModal = ({ score, highScore, onRestart }) => {
    const isNewHighScore = score === highScore && score > 0;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-300">
      <div className="bg-linear-to-br from-slate-800 to-slate-900 rounded-2xl p-8 max-w-md w-full border border-slate-700 shadow-2xl animate-in zoom-in duration-300">
        <div className="text-center">
          <div className="mb-6">
            <h2 className="text-5xl mb-2 text-transparent bg-clip-text bg-linear-to-r from-red-400 to-pink-600">
              GAME OVER
            </h2>

            {isNewHighScore && (
              <div className="flex items-center justify-center gap-2 text-yellow-400 animate-pulse">
                <Trophy className="w-5 h-5" />
                <span>¡Nuevo Récord!</span>
                <Trophy className="w-5 h-5" />
              </div>
            )}
          </div>

          <div className="space-y-4 mb-8">
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
              <div className="text-slate-400 mb-1">Tu Puntuación</div>
              <div className="text-4xl text-green-400">{score}</div>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
              <div className="text-slate-400 mb-1">Mejor Puntuación</div>
              <div className="text-4xl text-yellow-400">{highScore}</div>
            </div>
          </div>

          <Button
            onClick={onRestart}
            className="w-full bg-linear-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg shadow-green-500/30"
            size="lg"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Jugar de Nuevo
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GameOverModal;
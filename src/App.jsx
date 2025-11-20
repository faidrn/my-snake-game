import { useState, useEffect, useCallback } from 'react';
import Board from './components/Board';
import Controls from './components/Controls';
import GameStats from './components/GameStats';
import GameOverModal from './components/GameOverModal';

const GRID_SIZE = 20;
const INITIAL_SPEED = 150;
const SPEED_INCREMENT = 5;

const getInitialSnake = () => [
  { x: 10, y: 10 },
  { x: 10, y: 11 },
  { x: 10, y: 12 },
];

const getRandomFood = (snake) => {
  let newFood;
  do {
    newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
  } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
  return newFood;
};

function App() {
  const [snake, setSnake] = useState(getInitialSnake());
  const [food, setFood] = useState(getRandomFood(getInitialSnake()));
  const [direction, setDirection] = useState('UP');
  const [nextDirection, setNextDirection] = useState('UP');
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem('snakeHighScore');
    return saved ? parseInt(saved) : 0;
  });
  const [speed, setSpeed] = useState(INITIAL_SPEED);

  const resetGame = useCallback(() => {
    const newSnake = getInitialSnake();
    setSnake(newSnake);
    setFood(getRandomFood(newSnake));
    setDirection('UP');
    setNextDirection('UP');
    setGameOver(false);
    setIsPaused(true);
    setScore(0);
    setSpeed(INITIAL_SPEED);
  }, []);

  const handleDirectionChange = useCallback((newDirection) => {
    setNextDirection(prev => {
      if (newDirection === 'UP' && prev === 'DOWN') return prev;
      if (newDirection === 'DOWN' && prev === 'UP') return prev;
      if (newDirection === 'LEFT' && prev === 'RIGHT') return prev;
      if (newDirection === 'RIGHT' && prev === 'LEFT') return prev;
      return newDirection;
    });
  }, []);

  const togglePause = useCallback(() => {
    if (!gameOver) {
      setIsPaused(prev => !prev);
    }
  }, [gameOver]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === ' ') {
        e.preventDefault();
        togglePause();
        return;
      }

      if (isPaused && !gameOver) {
        setIsPaused(false);
      }

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          e.preventDefault();
          handleDirectionChange('UP');
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          e.preventDefault();
          handleDirectionChange('DOWN');
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          e.preventDefault();
          handleDirectionChange('LEFT');
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          e.preventDefault();
          handleDirectionChange('RIGHT');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleDirectionChange, togglePause, isPaused, gameOver]);

  useEffect(() => {
    if (gameOver || isPaused) return;

    const moveSnake = () => {
      setDirection(nextDirection);

      setSnake(prevSnake => {
        const head = prevSnake[0];
        let newHead = head;

        switch (nextDirection) {
          case 'UP':
            newHead = { x: head.x, y: head.y - 1 };
            break;
          case 'DOWN':
            newHead = { x: head.x, y: head.y + 1 };
            break;
          case 'LEFT':
            newHead = { x: head.x - 1, y: head.y };
            break;
          case 'RIGHT':
            newHead = { x: head.x + 1, y: head.y };
            break;
        }

        if (
          newHead.x < 0 ||
          newHead.x >= GRID_SIZE ||
          newHead.y < 0 ||
          newHead.y >= GRID_SIZE
        ) {
          setGameOver(true);
          return prevSnake;
        }

        if (prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
          setGameOver(true);
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];

        if (newHead.x === food.x && newHead.y === food.y) {
          setScore(prev => {
            const newScore = prev + 10;
            if (newScore > highScore) {
              setHighScore(newScore);
              localStorage.setItem('snakeHighScore', newScore.toString());
            }
            return newScore;
          });
          setSpeed(prev => Math.max(50, prev - SPEED_INCREMENT));
          setFood(getRandomFood(newSnake));
          return newSnake;
        }

        newSnake.pop();
        return newSnake;
      });
    };

    const gameLoop = setInterval(moveSnake, speed);
    return () => clearInterval(gameLoop);
  }, [nextDirection, food, gameOver, isPaused, speed, highScore]);


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-6xl mb-2 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">
            SNAKE
          </h1>
          <p className="text-slate-400">
            {isPaused && !gameOver ? 'Presiona cualquier tecla para comenzar' : ''}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-start justify-center">
          <GameStats score={score} highScore={highScore} isPaused={isPaused} gameOver={gameOver} />

          <div className="flex flex-col gap-4">
            <GameBoard snake={snake} food={food} gridSize={GRID_SIZE} />
            <GameControls
              onDirectionChange={handleDirectionChange}
              onPause={togglePause}
              onReset={resetGame}
              isPaused={isPaused}
              gameOver={gameOver}
            />
          </div>
        </div>

        <div className="mt-8 text-center text-slate-400 text-sm">
          <p>Usa las flechas o WASD para moverte • Espacio para pausar</p>
        </div>
      </div>

      {gameOver && (
        <GameOverModal
          score={score}
          highScore={highScore}
          onRestart={resetGame}
        />
      )}
    </div>
  );
}

export default App

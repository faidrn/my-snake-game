import { useState, useEffect } from 'react'
import Board from './components/Board'
import { 
    moveSnake, 
    getRandomPosition, 
    checkFoodCollision, 
    checkSelfCollision, 
    checkWallCollision 
  } from './utils/gameLogic'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div 
        className="min-h-screen bg-gray-100 flex flex-col items-center py-10 gap-6"
      >
        <h1
          className='text-4xl font-bold text-gray-700 tracking-tight'
        >
          Snake Game
        </h1>

        <div className='relative'>
          <Board snake={snake} food={food} />
        </div>
      </div>
      
    </>
  )
}

export default App

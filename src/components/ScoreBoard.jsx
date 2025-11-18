const ScoreBoard = ({ scores }) => {
  return (
    <div
        className="text-xl text-gray-700"
    >
        Puntuación: <span className="font-bold text-pink-500">{scores}</span>
    </div>
  );
};

export default ScoreBoard;
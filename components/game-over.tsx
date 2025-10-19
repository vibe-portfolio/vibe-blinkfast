"use client"

interface GameOverProps {
  score: number
  onPlayAgain: () => void
}

export default function GameOver({ score, onPlayAgain }: GameOverProps) {
  const getTitle = () => {
    if (score > 50) return "Champion"
    if (score > 30) return "Great Job"
    if (score > 10) return "Not Bad"
    return "Keep Trying"
  }

  return (
    <div className="flex flex-col items-center justify-center gap-8 bg-gray-900 rounded-2xl p-8 border border-gray-800">
      <h2 className="text-5xl font-bold text-white text-center">{getTitle()}</h2>

      <div className="text-center">
        <p className="text-white/60 text-sm mb-2">FINAL SCORE</p>
        <p className="text-7xl font-bold text-white">{score}</p>
      </div>

      <button
        onClick={onPlayAgain}
        className="mt-6 px-8 py-3 bg-white text-black font-bold text-lg rounded-lg hover:bg-gray-200 transition-colors active:scale-95"
      >
        Play Again
      </button>

      <p className="text-white/40 text-sm text-center">Click when the AI blinks</p>
    </div>
  )
}

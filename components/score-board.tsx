"use client"

interface ScoreBoardProps {
  score: number
  streak: number
}

export default function ScoreBoard({ score, streak }: ScoreBoardProps) {
  return (
    <div className="mb-8 flex justify-between items-center">
      <h1 className="text-4xl font-bold text-purple-600">Staring Contest</h1>
      <div className="flex gap-4">
        <div className="bg-white px-6 py-3 rounded-xl shadow-md border-2 border-purple-200">
          <p className="text-xs text-gray-600 font-semibold">SCORE</p>
          <p className="text-3xl font-bold text-purple-600">{score}</p>
        </div>
        <div className="bg-white px-6 py-3 rounded-xl shadow-md border-2 border-orange-200">
          <p className="text-xs text-gray-600 font-semibold">STREAK</p>
          <p className="text-3xl font-bold text-orange-600">{streak}</p>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState, useRef } from "react"
import GameArena from "@/components/game-arena"
import GameOver from "@/components/game-over"

export default function Home() {
  const [gameState, setGameState] = useState<"playing" | "gameover">("playing")
  const [finalScore, setFinalScore] = useState(0)
  const gameRef = useRef<{ reset: () => void }>(null)

  const handleGameOver = (score: number) => {
    setFinalScore(score)
    setGameState("gameover")
  }

  const handlePlayAgain = () => {
    setGameState("playing")
    gameRef.current?.reset()
  }

  return (
    <main className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {gameState === "playing" ? (
          <GameArena ref={gameRef} onGameOver={handleGameOver} />
        ) : (
          <GameOver score={finalScore} onPlayAgain={handlePlayAgain} />
        )}
      </div>
    </main>
  )
}

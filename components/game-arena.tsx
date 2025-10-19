"use client"

import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react"
import AIFace from "./ai-face"

interface GameArenaProps {
  onGameOver: (score: number) => void
}

export interface GameArenaHandle {
  reset: () => void
}

const GameArena = forwardRef<GameArenaHandle, GameArenaProps>(({ onGameOver }, ref) => {
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [isBlinking, setIsBlinking] = useState(false)
  const [showFeedback, setShowFeedback] = useState<"success" | "miss" | null>(null)
  const [gameActive, setGameActive] = useState(true)
  const blinkTimeoutRef = useRef<NodeJS.Timeout>()
  const gameTimerRef = useRef<NodeJS.Timeout>()
  const reactionTimeoutRef = useRef<NodeJS.Timeout>()

  useImperativeHandle(ref, () => ({
    reset: () => {
      setScore(0)
      setTimeLeft(30)
      setIsBlinking(false)
      setShowFeedback(null)
      setGameActive(true)
    },
  }))

  useEffect(() => {
    if (!gameActive) return

    gameTimerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameActive(false)
          onGameOver(score)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(gameTimerRef.current)
  }, [gameActive, score, onGameOver])

  useEffect(() => {
    if (!gameActive) return

    const scheduleNextBlink = () => {
      const delay = Math.random() * 2500 + 1000 // 1-3.5 seconds
      blinkTimeoutRef.current = setTimeout(() => {
        setIsBlinking(true)

        reactionTimeoutRef.current = setTimeout(() => {
          setIsBlinking(false)
          scheduleNextBlink()
        }, 400)
      }, delay)
    }

    scheduleNextBlink()

    return () => {
      clearTimeout(blinkTimeoutRef.current)
      clearTimeout(reactionTimeoutRef.current)
    }
  }, [gameActive])

  const handleClick = () => {
    if (!gameActive) return

    if (isBlinking) {
      setScore((prev) => prev + 1)
      setShowFeedback("success")
      setIsBlinking(false)
    } else {
      setShowFeedback("miss")
    }

    setTimeout(() => setShowFeedback(null), 300)
  }

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      {/* Score display */}
      <div className="text-center">
        <p className="text-white/60 text-sm mb-2">SCORE</p>
        <p className="text-6xl font-bold text-white">{score}</p>
      </div>

      {/* Game arena */}
      <div
        onClick={handleClick}
        className="relative w-full aspect-square max-w-sm bg-gradient-to-br from-gray-900 to-black rounded-2xl cursor-pointer overflow-hidden border border-gray-800 hover:border-gray-700 transition-colors"
      >
        <AIFace isBlinking={isBlinking} />

        {/* Feedback overlay */}
        {showFeedback && (
          <div
            className={`absolute inset-0 flex items-center justify-center text-3xl font-bold transition-opacity ${
              showFeedback === "success" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
            }`}
          >
            {showFeedback === "success" ? "+1" : "MISS"}
          </div>
        )}
      </div>

      {/* Timer and instructions */}
      <div className="text-center">
        <p className="text-white/60 text-sm mb-4">Click when the AI blinks</p>
        <div className="text-5xl font-bold text-white">{timeLeft}s</div>
      </div>
    </div>
  )
})

GameArena.displayName = "GameArena"

export default GameArena

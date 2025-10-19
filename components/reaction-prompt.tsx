"use client"

interface ReactionPromptProps {
  reactionType: "blink" | "wink" | "stare" | null
}

export default function ReactionPrompt({ reactionType }: ReactionPromptProps) {
  if (!reactionType) return null

  const prompts = {
    blink: { text: "BLINK!", emoji: "👁️", color: "text-blue-600" },
    wink: { text: "WINK!", emoji: "😉", color: "text-pink-600" },
    stare: { text: "STARE!", emoji: "👀", color: "text-purple-600" },
  }

  const prompt = prompts[reactionType]

  return (
    <div className={`absolute top-4 left-4 animate-wiggle ${prompt.color}`}>
      <div className="text-3xl font-bold drop-shadow-lg">{prompt.text}</div>
      <div className="text-4xl">{prompt.emoji}</div>
    </div>
  )
}

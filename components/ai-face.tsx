"use client"

interface AIFaceProps {
  isBlinking: boolean
}

export default function AIFace({ isBlinking }: AIFaceProps) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden">
      {/* Face container */}
      <div className="relative w-40 h-48 flex flex-col items-center justify-center">
        {/* Eyes container */}
        <div className="flex gap-10 mb-6">
          {/* Left eye */}
          <div className="relative w-14 h-14 bg-white rounded-full overflow-hidden shadow-lg">
            {!isBlinking ? (
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-7 h-7 bg-black rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
              </div>
            ) : (
              <div className="w-full h-0 bg-gray-400" />
            )}
          </div>

          {/* Right eye */}
          <div className="relative w-14 h-14 bg-white rounded-full overflow-hidden shadow-lg">
            {!isBlinking ? (
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-7 h-7 bg-black rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
              </div>
            ) : (
              <div className="w-full h-0 bg-gray-400" />
            )}
          </div>
        </div>

        {/* Mouth */}
        <div className="mt-4 w-16 h-8 border-4 border-white rounded-b-full" />
      </div>
    </div>
  )
}

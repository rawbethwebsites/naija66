"use client";

import type { GameResult as GameResultType } from "./GameEngine";

interface GameResultProps {
  result: GameResultType;
  playerState: string | null;
  onViewStory: () => void;
  onPlayAgain: () => void;
  onSharePride: () => void;
  onBackToMap: () => void;
}

export default function GameResultScreen({
  result,
  playerState,
  onViewStory,
  onPlayAgain,
  onSharePride,
  onBackToMap,
}: GameResultProps) {
  const accuracy = Math.round(
    (result.correctAnswers / Math.max(result.answeredQuestions.length, 1)) * 100
  );

  const rating =
    result.score >= 50
      ? "Legend"
      : result.score >= 35
        ? "Sharp"
        : result.score >= 20
          ? "Rising"
          : "Rookie";

  const ratingMessage =
    result.score >= 50
      ? "Omo, you too know! 🏆"
      : result.score >= 35
        ? "E be like say you sabi! ⚡"
        : result.score >= 20
          ? "Not bad o, try again! 🔥"
          : "No wahala, play again! 💪";

  return (
    <div className="min-h-dvh flex flex-col bg-naija-indigo px-5 py-8">
      {/* Score hero */}
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="text-naija-cream/40 font-body text-sm mb-2">
          Your Score
        </div>
        <div className="text-display font-bold text-7xl text-naija-gold mb-1">
          {result.score}
        </div>
        <div className="text-naija-cream/60 font-body text-lg mb-6">
          {ratingMessage}
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-4 w-full max-w-sm mb-8">
          <StatBox label="Correct" value={`${result.correctAnswers}`} />
          <StatBox label="Accuracy" value={`${accuracy}%`} />
          <StatBox label="Best Streak" value={`${result.bestStreak}`} />
        </div>

        {/* Rating badge */}
        <div className="card-glass px-6 py-3 mb-8">
          <span className="text-naija-cream/60 font-body text-sm">
            Rating:{" "}
          </span>
          <span className="text-display font-bold text-naija-gold">
            {rating}
          </span>
          {playerState && (
            <>
              <span className="text-naija-cream/30 mx-2">·</span>
              <span className="text-naija-cream/60 font-body text-sm">
                {playerState}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-3 max-w-sm mx-auto w-full">
        <button onClick={onViewStory} className="btn-primary w-full">
          The Real Story
        </button>
        <button onClick={onSharePride} className="btn-coral w-full">
          Share Naija Pride Card
        </button>
        <div className="flex gap-3">
          <button
            onClick={onPlayAgain}
            className="flex-1 card-glass px-4 py-3 text-naija-cream font-body font-semibold text-center"
          >
            Play Again
          </button>
          <button
            onClick={onBackToMap}
            className="flex-1 card-glass px-4 py-3 text-naija-cream/60 font-body text-center"
          >
            Back to Map
          </button>
        </div>
      </div>
    </div>
  );
}

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="card-glass px-3 py-4 text-center">
      <div className="text-display font-bold text-xl text-naija-cream">
        {value}
      </div>
      <div className="text-naija-cream/40 font-body text-xs mt-1">{label}</div>
    </div>
  );
}

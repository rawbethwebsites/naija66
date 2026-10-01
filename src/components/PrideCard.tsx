"use client";

import { useRef } from "react";
import type { GameResult } from "./GameEngine";

interface PrideCardProps {
  result: GameResult;
  playerName: string;
  playerState: string | null;
  onClose: () => void;
}

export default function PrideCard({
  result,
  playerName,
  playerState,
  onClose,
}: PrideCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const accuracy = Math.round(
    (result.correctAnswers / Math.max(result.answeredQuestions.length, 1)) * 100
  );

  const shareText = `Omo see my score 😭🇳🇬 I scored ${result.score} on the 66-Second Naija Challenge! Try beat this one 👉 naija66.ng`;

  const handleShare = async (platform: "whatsapp" | "twitter" | "copy") => {
    const urls: Record<string, string> = {
      whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`,
      copy: "",
    };

    if (platform === "copy") {
      try {
        await navigator.clipboard.writeText(shareText);
        alert("Copied to clipboard!");
      } catch {
        // Fallback
      }
      return;
    }

    window.open(urls[platform], "_blank", "noopener");
  };

  return (
    <div className="min-h-dvh bg-naija-charcoal flex flex-col items-center px-5 py-8">
      <div className="flex items-center justify-between w-full max-w-sm mb-6">
        <h1 className="text-display font-bold text-xl text-naija-cream">
          Your Naija Pride Card
        </h1>
        <button
          onClick={onClose}
          className="text-naija-cream/40 font-body text-sm"
        >
          Close
        </button>
      </div>

      {/* The Pride Card */}
      <div
        ref={cardRef}
        className="w-full max-w-sm aspect-square rounded-3xl overflow-hidden relative"
        style={{
          background:
            "linear-gradient(145deg, var(--naija-indigo) 0%, #0E0B3D 50%, var(--naija-green) 100%)",
        }}
      >
        {/* Decorative pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 20px,
              rgba(255,248,240,0.05) 20px,
              rgba(255,248,240,0.05) 21px
            )`,
          }}
        />

        <div className="relative z-10 flex flex-col h-full p-8">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <div className="text-display font-bold text-sm text-naija-gold tracking-wide">
                NAIJA 66
              </div>
              <div className="text-naija-cream/40 font-body text-xs mt-1">
                66th Independence Day
              </div>
            </div>
            <div className="text-3xl">🇳🇬</div>
          </div>

          {/* Center: Score */}
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="text-naija-cream/40 font-body text-sm mb-1">
              I scored
            </div>
            <div className="text-display font-bold text-8xl text-naija-gold leading-none">
              {result.score}
            </div>
            <div className="text-naija-cream/60 font-body text-lg mt-2">
              on the 66-Second Challenge
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-end justify-between">
            <div>
              <div className="text-naija-cream font-display font-semibold text-lg">
                {playerName || "Anonymous"}
              </div>
              {playerState && (
                <div className="text-naija-cream/50 font-body text-sm">
                  {playerState} State
                </div>
              )}
            </div>
            <div className="text-right">
              <div className="text-naija-cream/40 font-body text-xs">
                {accuracy}% accuracy
              </div>
              <div className="text-naija-cream/40 font-body text-xs">
                {result.bestStreak} best streak
              </div>
            </div>
          </div>

          {/* Tagline */}
          <div className="text-center mt-4 pt-4 border-t border-white/10">
            <span className="text-naija-gold font-display font-semibold text-sm">
              What&apos;s your 66?
            </span>
            <span className="text-naija-cream/30 font-body text-xs ml-2">
              naija66.ng
            </span>
          </div>
        </div>
      </div>

      {/* Share buttons */}
      <div className="w-full max-w-sm mt-6 space-y-3">
        <button
          onClick={() => handleShare("whatsapp")}
          className="w-full py-4 rounded-2xl font-body font-semibold text-white text-center"
          style={{ backgroundColor: "#25D366" }}
        >
          Share on WhatsApp
        </button>
        <div className="flex gap-3">
          <button
            onClick={() => handleShare("twitter")}
            className="flex-1 card-glass py-3 text-naija-cream font-body font-semibold text-center"
          >
            Share on X
          </button>
          <button
            onClick={() => handleShare("copy")}
            className="flex-1 card-glass py-3 text-naija-cream/60 font-body text-center"
          >
            Copy Link
          </button>
        </div>
      </div>
    </div>
  );
}

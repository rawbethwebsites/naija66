"use client";

import type { GameResult } from "./GameEngine";

interface RealStoryCardProps {
  result: GameResult;
  onClose: () => void;
}

export default function RealStoryCard({ result, onClose }: RealStoryCardProps) {
  // Show the real stories for questions that were answered
  const stories = result.answeredQuestions.map((aq) => aq.question.realStory);
  // Deduplicate by fact
  const uniqueStories = stories.filter(
    (story, i, arr) => arr.findIndex((s) => s.fact === story.fact) === i
  );

  return (
    <div className="min-h-dvh bg-naija-charcoal px-5 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-display font-bold text-2xl text-naija-cream">
          The Real Story
        </h1>
        <button
          onClick={onClose}
          className="text-naija-cream/40 font-body text-sm"
        >
          Close
        </button>
      </div>

      <p className="text-naija-cream/60 font-body text-sm mb-6 leading-relaxed max-w-prose">
        Every game in Naija 66 is based on a real Nigerian achievement.
        Here are the stories behind the questions you played.
      </p>

      <div className="space-y-4">
        {uniqueStories.map((story, i) => (
          <div key={i} className="card-glass p-5">
            <p className="text-naija-cream font-body leading-relaxed mb-3">
              {story.fact}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-naija-cream/40 font-body text-xs">
                {story.date}
              </span>
              <a
                href={story.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-naija-gold font-body text-xs font-semibold hover:underline"
              >
                {story.source} ↗
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <button onClick={onClose} className="btn-primary">
          Back to Results
        </button>
      </div>
    </div>
  );
}

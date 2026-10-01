"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { getGameQuestions, type Question } from "@/data/questions";

interface GameEngineProps {
  onGameEnd: (result: GameResult) => void;
  onBack: () => void;
}

export interface GameResult {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  bestStreak: number;
  timeUsed: number;
  answeredQuestions: {
    question: Question;
    selectedIndex: number;
    correct: boolean;
  }[];
}

const GAME_DURATION = 66;
const FREEZE_PENALTY = 3;

export default function GameEngine({ onGameEnd, onBack }: GameEngineProps) {
  const [questions] = useState(() => getGameQuestions(15));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [frozen, setFrozen] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const answeredRef = useRef<GameResult["answeredQuestions"]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentQuestion = questions[currentIndex];

  // Timer
  useEffect(() => {
    if (gameOver) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameOver]);

  const endGame = useCallback(() => {
    setGameOver(true);
    if (timerRef.current) clearInterval(timerRef.current);
    onGameEnd({
      score,
      totalQuestions: questions.length,
      correctAnswers: correctCount,
      bestStreak,
      timeUsed: GAME_DURATION - timeLeft,
      answeredQuestions: answeredRef.current,
    });
  }, [score, questions.length, correctCount, bestStreak, timeLeft, onGameEnd]);

  useEffect(() => {
    if (gameOver) endGame();
  }, [gameOver, endGame]);

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null || frozen || gameOver) return;

    setSelectedAnswer(index);
    setShowFeedback(true);

    const isCorrect = index === currentQuestion.correctIndex;

    answeredRef.current.push({
      question: currentQuestion,
      selectedIndex: index,
      correct: isCorrect,
    });

    if (isCorrect) {
      const streakBonus = Math.min(streak, 5);
      const points = 1 + streakBonus;
      setScore((prev) => prev + points);
      setCorrectCount((prev) => prev + 1);
      setStreak((prev) => {
        const newStreak = prev + 1;
        setBestStreak((best) => Math.max(best, newStreak));
        return newStreak;
      });
    } else {
      setStreak(0);
      setFrozen(true);
      setTimeLeft((prev) => Math.max(0, prev - FREEZE_PENALTY));
      setTimeout(() => setFrozen(false), 800);
    }

    setTimeout(() => {
      setSelectedAnswer(null);
      setShowFeedback(false);
      if (currentIndex + 1 >= questions.length) {
        setGameOver(true);
      } else {
        setCurrentIndex((prev) => prev + 1);
      }
    }, 1200);
  };

  // Timer ring calculation
  const timerPercent = (timeLeft / GAME_DURATION) * 100;
  const timerColor =
    timeLeft > 20
      ? "var(--naija-green)"
      : timeLeft > 10
        ? "var(--naija-gold)"
        : "var(--naija-coral)";

  if (gameOver) return null;

  return (
    <div className="min-h-dvh flex flex-col bg-naija-charcoal">
      {/* Header: Timer + Score */}
      <div className="flex items-center justify-between px-5 pt-6 pb-4">
        <button
          onClick={onBack}
          className="text-naija-cream/60 font-body text-sm"
          aria-label="Exit game"
        >
          Exit
        </button>

        {/* Circular timer */}
        <div className="relative w-16 h-16 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="rgba(255,248,240,0.1)"
              strokeWidth="6"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke={timerColor}
              strokeWidth="6"
              strokeLinecap="round"
              className="timer-ring"
              style={{
                strokeDashoffset: 283 - (283 * timerPercent) / 100,
              }}
            />
          </svg>
          <span
            className="absolute text-display font-bold text-lg"
            style={{ color: timerColor }}
          >
            {timeLeft}
          </span>
        </div>

        <div className="text-right">
          <div className="text-display font-bold text-2xl text-naija-gold">
            {score}
          </div>
          <div className="text-naija-cream/40 text-xs font-body">points</div>
        </div>
      </div>

      {/* Streak indicator */}
      {streak > 1 && (
        <div className="text-center pb-2">
          <span className="inline-block px-4 py-1 rounded-full bg-naija-green/20 text-naija-green-light text-sm font-body font-semibold">
            {streak} streak{" "}
            {streak >= 5 ? "🔥" : streak >= 3 ? "⚡" : "✨"}
          </span>
        </div>
      )}

      {/* Frozen overlay */}
      {frozen && (
        <div className="text-center pb-2">
          <span className="inline-block px-4 py-1 rounded-full bg-naija-coral/20 text-naija-coral text-sm font-body font-semibold">
            −{FREEZE_PENALTY}s time penalty
          </span>
        </div>
      )}

      {/* Progress bar */}
      <div className="px-5 pb-6">
        <div className="flex gap-1">
          {questions.map((_, i) => (
            <div
              key={i}
              className="h-1 flex-1 rounded-full transition-colors duration-300"
              style={{
                backgroundColor:
                  i < currentIndex
                    ? answeredRef.current[i]?.correct
                      ? "var(--naija-green)"
                      : "var(--naija-coral)"
                    : i === currentIndex
                      ? "var(--naija-gold)"
                      : "rgba(255,248,240,0.1)",
              }}
            />
          ))}
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 flex flex-col px-5 pb-8">
        <div className="flex-1 flex items-center">
          <h2 className="text-display text-xl font-semibold text-naija-cream leading-snug">
            {currentQuestion.question}
          </h2>
        </div>

        {/* Answer options */}
        <div className="space-y-3 mt-6">
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === currentQuestion.correctIndex;
            const showResult = showFeedback;

            let bgColor = "rgba(255,248,240,0.06)";
            let borderColor = "rgba(255,248,240,0.1)";
            let textColor = "var(--naija-cream)";

            if (showResult && isCorrect) {
              bgColor = "rgba(10,104,71,0.3)";
              borderColor = "var(--naija-green)";
            } else if (showResult && isSelected && !isCorrect) {
              bgColor = "rgba(232,93,74,0.3)";
              borderColor = "var(--naija-coral)";
            } else if (isSelected) {
              borderColor = "var(--naija-gold)";
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={selectedAnswer !== null || frozen}
                className="w-full text-left px-5 py-4 rounded-2xl border transition-all duration-200 active:scale-[0.98] disabled:cursor-default font-body"
                style={{
                  backgroundColor: bgColor,
                  borderColor,
                  color: textColor,
                }}
                aria-label={`Option ${index + 1}: ${option}`}
              >
                <span className="text-naija-cream/40 font-semibold mr-3 text-sm">
                  {String.fromCharCode(65 + index)}
                </span>
                {option}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

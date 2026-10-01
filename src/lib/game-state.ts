export type AgeTier = "5-7" | "8-12" | "13-17" | "adults";
export type GameScreen =
  | "landing"
  | "age-select"
  | "state-select"
  | "map-hub"
  | "game-intro"
  | "game-play"
  | "game-result"
  | "real-story"
  | "pride-card";

export interface PlayerState {
  displayName: string;
  ageTier: AgeTier | null;
  stateOfOrigin: string | null;
  stateCode: string | null;
  zone: string | null;
  totalScore: number;
  gamesPlayed: number;
  achievements: string[];
}

export interface GameSession {
  gameId: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  streak: number;
  bestStreak: number;
  timeRemaining: number;
  startedAt: number;
}

export const INITIAL_PLAYER: PlayerState = {
  displayName: "",
  ageTier: null,
  stateOfOrigin: null,
  stateCode: null,
  zone: null,
  totalScore: 0,
  gamesPlayed: 0,
  achievements: [],
};

export const AGE_TIERS: {
  id: AgeTier;
  label: string;
  subtitle: string;
  emoji: string;
  color: string;
}[] = [
  {
    id: "5-7",
    label: "Explorers",
    subtitle: "Ages 5–7",
    emoji: "🌟",
    color: "#FFD166",
  },
  {
    id: "8-12",
    label: "Discoverers",
    subtitle: "Ages 8–12",
    emoji: "🔍",
    color: "#11A87A",
  },
  {
    id: "13-17",
    label: "Challengers",
    subtitle: "Ages 13–17",
    emoji: "⚡",
    color: "#E85D4A",
  },
  {
    id: "adults",
    label: "Adults",
    subtitle: "18+",
    emoji: "🏆",
    color: "#F4A900",
  },
];

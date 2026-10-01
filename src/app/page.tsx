"use client";

import { useState, useCallback } from "react";
import NigeriaMap from "@/components/NigeriaMap";
import GameEngine, { type GameResult } from "@/components/GameEngine";
import GameResultScreen from "@/components/GameResult";
import RealStoryCard from "@/components/RealStoryCard";
import PrideCard from "@/components/PrideCard";
import { STATES } from "@/data/states";
import {
  type AgeTier,
  type GameScreen,
  type PlayerState,
  INITIAL_PLAYER,
  AGE_TIERS,
} from "@/lib/game-state";
import type { GeopoliticalZone } from "@/data/states";

export default function Home() {
  const [screen, setScreen] = useState<GameScreen>("landing");
  const [player, setPlayer] = useState<PlayerState>(INITIAL_PLAYER);
  const [selectedZone, setSelectedZone] = useState<GeopoliticalZone | null>(
    null
  );
  const [gameResult, setGameResult] = useState<GameResult | null>(null);
  const [completedZones, setCompletedZones] = useState<GeopoliticalZone[]>([]);

  const handleAgeTierSelect = (tier: AgeTier) => {
    setPlayer((prev) => ({ ...prev, ageTier: tier }));
    setScreen("state-select");
  };

  const handleStateSelect = (stateName: string) => {
    const state = STATES.find((s) => s.name === stateName);
    if (state) {
      setPlayer((prev) => ({
        ...prev,
        stateOfOrigin: state.name,
        stateCode: state.code,
        zone: state.zone,
      }));
      setScreen("map-hub");
    }
  };

  const handleZoneClick = (zone: GeopoliticalZone) => {
    setSelectedZone(zone);
    setScreen("game-intro");
  };

  const handleGameEnd = useCallback(
    (result: GameResult) => {
      setGameResult(result);
      setPlayer((prev) => ({
        ...prev,
        totalScore: prev.totalScore + result.score,
        gamesPlayed: prev.gamesPlayed + 1,
      }));
      if (selectedZone && !completedZones.includes(selectedZone)) {
        setCompletedZones((prev) => [...prev, selectedZone]);
      }
      setScreen("game-result");
    },
    [selectedZone, completedZones]
  );

  // --- SCREENS ---

  if (screen === "landing") {
    return <LandingScreen onStart={() => setScreen("age-select")} />;
  }

  if (screen === "age-select") {
    return (
      <AgeDoorScreen
        onSelect={handleAgeTierSelect}
        onBack={() => setScreen("landing")}
      />
    );
  }

  if (screen === "state-select") {
    return (
      <StateSelectScreen
        onSelect={handleStateSelect}
        onBack={() => setScreen("age-select")}
        isDiaspora={false}
      />
    );
  }

  if (screen === "map-hub") {
    return (
      <MapHubScreen
        player={player}
        onZoneClick={handleZoneClick}
        completedZones={completedZones}
        selectedZone={selectedZone}
      />
    );
  }

  if (screen === "game-intro") {
    return (
      <GameIntroScreen
        zone={selectedZone!}
        onStart={() => setScreen("game-play")}
        onBack={() => {
          setSelectedZone(null);
          setScreen("map-hub");
        }}
      />
    );
  }

  if (screen === "game-play") {
    return (
      <GameEngine
        onGameEnd={handleGameEnd}
        onBack={() => {
          setSelectedZone(null);
          setScreen("map-hub");
        }}
      />
    );
  }

  if (screen === "game-result" && gameResult) {
    return (
      <GameResultScreen
        result={gameResult}
        playerState={player.stateOfOrigin}
        onViewStory={() => setScreen("real-story")}
        onPlayAgain={() => setScreen("game-play")}
        onSharePride={() => setScreen("pride-card")}
        onBackToMap={() => {
          setSelectedZone(null);
          setScreen("map-hub");
        }}
      />
    );
  }

  if (screen === "real-story" && gameResult) {
    return (
      <RealStoryCard
        result={gameResult}
        onClose={() => setScreen("game-result")}
      />
    );
  }

  if (screen === "pride-card" && gameResult) {
    return (
      <PrideCard
        result={gameResult}
        playerName={player.displayName || "Naija Champion"}
        playerState={player.stateOfOrigin}
        onClose={() => setScreen("game-result")}
      />
    );
  }

  return <LandingScreen onStart={() => setScreen("age-select")} />;
}

// ============================================================
// Sub-screens as components within the page
// ============================================================

function LandingScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Background decorative elements */}
      <div
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 30% 20%, rgba(10,104,71,0.15) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(244,169,0,0.1) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 text-center max-w-md">
        {/* Animated 66 */}
        <div className="mb-6">
          <span className="text-display font-bold text-[120px] leading-none text-naija-gold opacity-90">
            66
          </span>
        </div>

        <h1 className="text-display font-bold text-4xl text-naija-cream mb-3 leading-tight">
          Naija 66
        </h1>

        <p className="font-body text-naija-cream/60 text-lg mb-2 leading-relaxed">
          Celebrate Nigeria&apos;s 66th Independence Day through play.
        </p>

        <p className="font-body text-naija-cream/40 text-sm mb-10 leading-relaxed max-w-xs mx-auto">
          66 seconds. 66 achievements. One nation.
          Discover the real stories behind Nigeria&apos;s proudest moments.
        </p>

        <button onClick={onStart} className="btn-primary text-xl px-12 py-5">
          Play Now
        </button>

        {/* Live counter placeholder */}
        <div className="mt-12 card-glass px-6 py-4 inline-block">
          <div className="text-display font-bold text-2xl text-naija-gold">
            0
          </div>
          <div className="text-naija-cream/40 font-body text-xs mt-1">
            points scored nationally — goal: 66,000,000
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-6 text-center">
        <span className="text-naija-cream/20 font-body text-xs">
          A Boost Nation project · October 1, 2026
        </span>
      </div>
    </div>
  );
}

function AgeDoorScreen({
  onSelect,
  onBack,
}: {
  onSelect: (tier: AgeTier) => void;
  onBack: () => void;
}) {
  return (
    <div className="min-h-dvh flex flex-col px-6 py-8">
      <button
        onClick={onBack}
        className="text-naija-cream/40 font-body text-sm self-start mb-8"
      >
        ← Back
      </button>

      <h1 className="text-display font-bold text-3xl text-naija-cream mb-2">
        Who&apos;s playing?
      </h1>
      <p className="text-naija-cream/50 font-body mb-10">
        Pick your age group to get the right experience.
      </p>

      <div className="grid grid-cols-2 gap-4 max-w-md">
        {AGE_TIERS.map((tier) => (
          <button
            key={tier.id}
            onClick={() => onSelect(tier.id)}
            className="rounded-3xl p-6 text-left transition-transform active:scale-95"
            style={{
              backgroundColor: tier.color + "18",
              border: `2px solid ${tier.color}40`,
            }}
          >
            <div className="text-4xl mb-3">{tier.emoji}</div>
            <div
              className="text-display font-bold text-xl mb-1"
              style={{ color: tier.color }}
            >
              {tier.label}
            </div>
            <div className="text-naija-cream/50 font-body text-sm">
              {tier.subtitle}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function StateSelectScreen({
  onSelect,
  onBack,
}: {
  onSelect: (state: string) => void;
  onBack: () => void;
  isDiaspora: boolean;
}) {
  const [search, setSearch] = useState("");

  const filtered = STATES.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-dvh flex flex-col px-6 py-8">
      <button
        onClick={onBack}
        className="text-naija-cream/40 font-body text-sm self-start mb-8"
      >
        ← Back
      </button>

      <h1 className="text-display font-bold text-3xl text-naija-cream mb-2">
        Which state is home?
      </h1>
      <p className="text-naija-cream/50 font-body mb-6">
        In the diaspora? Pick the state your family is from.
      </p>

      {/* Search */}
      <input
        type="text"
        placeholder="Search states..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-md card-glass px-5 py-3 font-body text-naija-cream
                   placeholder:text-naija-cream/30 outline-none focus:ring-2
                   focus:ring-naija-gold/50 mb-6 rounded-2xl bg-transparent"
      />

      {/* State grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-w-md overflow-y-auto max-h-[60vh] pb-4">
        {filtered.map((state) => (
          <button
            key={state.code}
            onClick={() => onSelect(state.name)}
            className="card-glass px-4 py-3 text-left transition-all
                       hover:bg-naija-cream/10 active:scale-95 rounded-xl"
          >
            <div className="text-naija-cream font-body font-semibold text-sm">
              {state.name}
            </div>
            <div className="text-naija-cream/30 font-body text-xs">
              {state.capital}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function MapHubScreen({
  player,
  onZoneClick,
  completedZones,
  selectedZone,
}: {
  player: PlayerState;
  onZoneClick: (zone: GeopoliticalZone) => void;
  completedZones: GeopoliticalZone[];
  selectedZone: GeopoliticalZone | null;
}) {
  return (
    <div className="min-h-dvh flex flex-col px-4 py-6">
      {/* Header ticker */}
      <div className="card-glass px-4 py-3 mb-6 flex items-center justify-between text-xs font-body">
        <span className="text-naija-green-light font-semibold">
          🟢 Players online now
        </span>
        <span className="text-naija-cream/40">
          {player.stateOfOrigin} · {player.totalScore} pts
        </span>
      </div>

      {/* Map */}
      <div className="flex-1 flex items-center">
        <NigeriaMap
          onZoneClick={onZoneClick}
          activeZone={selectedZone}
          completedZones={completedZones}
        />
      </div>

      {/* Zone legend */}
      <div className="mt-6">
        <div className="text-naija-cream/40 font-body text-xs mb-3">
          Tap a glowing zone to play
        </div>
        <div className="flex flex-wrap gap-2">
          {(["south-west", "south-south", "south-east", "north-central", "north-west", "north-east"] as const).map(
            (zone) => {
              const isActive = zone === "south-west" || zone === "south-south";
              return (
                <span
                  key={zone}
                  className={`inline-block px-3 py-1 rounded-full font-body text-xs ${
                    isActive
                      ? "text-naija-cream font-semibold"
                      : "text-naija-cream/20"
                  }`}
                  style={{
                    backgroundColor: isActive
                      ? "rgba(255,248,240,0.08)"
                      : "transparent",
                  }}
                >
                  {zone
                    .split("-")
                    .map((w) => w[0].toUpperCase() + w.slice(1))
                    .join(" ")}
                  {!isActive && " (soon)"}
                </span>
              );
            }
          )}
        </div>
      </div>

      {/* National counter */}
      <div className="mt-6 card-glass px-5 py-4 text-center">
        <div className="text-naija-cream/40 font-body text-xs mb-1">
          National Goal
        </div>
        <div className="text-display font-bold text-2xl text-naija-gold">
          0 / 66,000,000
        </div>
        <div className="w-full h-2 rounded-full bg-naija-cream/5 mt-3 overflow-hidden">
          <div
            className="h-full rounded-full bg-naija-gold transition-all duration-500"
            style={{ width: "0%" }}
          />
        </div>
      </div>
    </div>
  );
}

function GameIntroScreen({
  zone,
  onStart,
  onBack,
}: {
  zone: GeopoliticalZone;
  onStart: () => void;
  onBack: () => void;
}) {
  const gameInfo: Record<string, { title: string; story: string }> = {
    "south-west": {
      title: "66-Second Naija Challenge",
      story:
        "From the biggest jollof ever cooked to a solar robot built by students in Ikotun — how well do you know Nigeria's proudest moments?",
    },
    "south-south": {
      title: "66-Second Naija Challenge",
      story:
        "Edo Queens won on penalties. Rachel Ikemeh saved a monkey species. The South-South has stories you haven't heard yet.",
    },
  };

  const info = gameInfo[zone] || gameInfo["south-west"];

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center px-6">
      <button
        onClick={onBack}
        className="text-naija-cream/40 font-body text-sm self-start mb-12"
      >
        ← Back to Map
      </button>

      <div className="text-center max-w-sm flex-1 flex flex-col items-center justify-center">
        <div className="text-6xl mb-6">⚡</div>
        <h1 className="text-display font-bold text-3xl text-naija-cream mb-4">
          {info.title}
        </h1>
        <p className="text-naija-cream/60 font-body leading-relaxed mb-4">
          {info.story}
        </p>
        <p className="text-naija-cream/30 font-body text-sm mb-10">
          Answer as many questions as you can in 66 seconds.
          Wrong answers freeze the clock for 3 seconds.
        </p>

        <button onClick={onStart} className="btn-primary text-xl px-12 py-5">
          Start — 66 seconds
        </button>
      </div>
    </div>
  );
}

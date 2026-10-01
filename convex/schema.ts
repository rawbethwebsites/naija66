import { defineTable, defineSchema } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  leads: defineTable({
    displayName: v.string(),
    whatsapp: v.string(),
    email: v.optional(v.string()),
    stateOfOrigin: v.optional(v.string()),
    ageTier: v.optional(v.string()),
    totalScore: v.number(),
    gamesPlayed: v.number(),
    highScore: v.number(),
    bestStreak: v.number(),
    gameId: v.optional(v.string()),
    lastScore: v.number(),
    capturedAt: v.number(),
  }).index("by_captured_at", ["capturedAt"]),
});
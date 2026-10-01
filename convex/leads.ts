import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const saveLead = mutation({
  args: {
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
  },
  returns: v.id("leads"),
  handler: async (ctx, args) => {
    const capturedAt = Date.now();
    return await ctx.db.insert("leads", { ...args, capturedAt });
  },
});

export const listLeads = query({
  args: { limit: v.optional(v.number()) },
  returns: v.array(
    v.object({
      _id: v.id("leads"),
      _creationTime: v.number(),
      displayName: v.string(),
      whatsapp: v.string(),
      email: v.optional(v.string()),
      stateOfOrigin: v.optional(v.string()),
      totalScore: v.number(),
      capturedAt: v.number(),
    })
  ),
  handler: async (ctx, args) => {
    const rows = await ctx.db
      .query("leads")
      .withIndex("by_captured_at")
      .order("desc")
      .take(args.limit ?? 50);
    return rows.map((r) => ({
      _id: r._id,
      _creationTime: r._creationTime,
      displayName: r.displayName,
      whatsapp: r.whatsapp,
      email: r.email,
      stateOfOrigin: r.stateOfOrigin,
      totalScore: r.totalScore,
      capturedAt: r.capturedAt,
    }));
  },
});
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getAllSolutions = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("solutions").collect();
  },
});

export const getSolutionsOfUpgrade = query({
  args: { upgradeName: v.string() },
  handler: async (ctx, { upgradeName }) => {
    const [upgrade_id] = await ctx.db
      .query("upgrades")
      .filter((q) => q.eq(q.field("name"), upgradeName))
      .collect();

    const solutions = await ctx.db
      .query("solutions")
      .filter((q) => q.eq(q.field("upgrade_id"), upgrade_id._id))
      .collect();

    return solutions.sort((a, b) => a.label.localeCompare(b.label));
  },
});

export const addUpgradeToSolution = mutation({
  args: { solution_id: v.id("solutions"), upgrade_id: v.id("upgrades") },
  handler: async (ctx, { solution_id, upgrade_id }) => {
    await ctx.db.patch(solution_id, { upgrade_id });
  },
});

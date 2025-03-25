import { query } from "./_generated/server";
import { v } from "convex/values";

export const getUpgradeAccessor = query({
  args: {},
  handler: async (ctx) => {
    const upgrades = await ctx.db.query("upgrades").collect();
    return upgrades.sort((a, b) => a.label.localeCompare(b.label));
  },
});

export const getSingleUpgrade = query({
  args: { upgradeName: v.string() },
  handler: async (ctx, { upgradeName }) => {
    return await ctx.db
      .query("upgrades")
      .filter((q) => q.eq(q.field("name"), upgradeName))
      .first();
  },
});

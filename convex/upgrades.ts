import { query } from "./_generated/server";

export const getUpgrades = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("upgrades").collect();
  },
});

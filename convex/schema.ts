import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  upgrades: defineTable({
    name: v.string(),
    label: v.string(),
    description: v.string(),
    type: v.union(v.literal("GC"), v.literal("EE")),
    is_lot_upgrade: v.boolean(),
    avg_price: v.number(),
    image_url: v.string(),
  }),
  solutions: defineTable({
    name: v.string(),
    label: v.string(),
    description: v.string(),
    upgrade_id: v.id("upgrades"),
    image_url: v.string(),
  }),
  projects: defineTable({}),
  customers: defineTable({
    first_name: v.string(),
    last_name: v.string(),
    email: v.optional(v.string()),
    phone: v.optional(v.string()),
    address: v.object({
      street: v.string(),
      city: v.string(),
      state: v.string(),
      zip: v.string(),
    }),
  }),
});

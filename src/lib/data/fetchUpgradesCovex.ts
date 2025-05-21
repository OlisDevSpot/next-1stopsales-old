import { api } from "@convex/_generated/api";
import { useQuery } from "convex/react";

export default function fetchUpgradesConvex() {
  const upgrades = useQuery(api.upgrades.getAllUpgradeKeys);
  return upgrades;
}

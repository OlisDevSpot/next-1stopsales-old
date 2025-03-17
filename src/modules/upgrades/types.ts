import { Metadata } from "@/types/global";
import { upgradesMetadata } from "./upgrades.config";

export type AllUpgradeKeys = (typeof upgradesMetadata)[number]["accessor"];

export interface UpgradeMetadata extends Metadata<AllUpgradeKeys> {
  extent: "home" | "lot";
  type: "GC" | "EE";
}

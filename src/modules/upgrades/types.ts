import { Metadata } from "@/types/global";
import { upgradesMetadata } from "./upgrades.config";

export type UpgradeAccessor = (typeof upgradesMetadata)[number]["accessor"];

export interface UpgradeMetadata extends Metadata<UpgradeAccessor> {
  extent: "home" | "lot";
  type: "GC" | "EE";
}

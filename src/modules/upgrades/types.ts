import { Metadata } from "@/types/global";

export type AllUpgrades =
  | "solar"
  | "roof"
  | "insulation"
  | "windows"
  | "dryscaping"
  | "hvac"
  | "exteriorPaint"
  | "interiorPaint"
  | "electricals";

export interface UpgradeMetadata extends Metadata<AllUpgrades> {
  extent: "home" | "lot";
  type: "GC" | "EE";
}

import { Metadata } from "@/types/global";
import { Upgrade } from "../upgrades/Upgrade";
import { type Solution } from "../solutions/Solution";

export function getCategoryDetail(
  category: Metadata,
  field: keyof Metadata = "label"
) {
  return category[field];
}

export function generateVariables(solution: Solution) {
  return [
    ...solution.variables.map((v) => ({
      ...v,
      value: v.defaultValue || 0,
    })),
  ];
}

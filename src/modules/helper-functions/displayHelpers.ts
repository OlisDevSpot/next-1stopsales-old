import { Metadata } from "@/types/global";
import { Upgrade } from "../upgrades/Upgrade";
import { Solution } from "../solutions/Solution";

export function getCategoryDetail(
  category: Metadata,
  field: keyof Metadata = "label"
) {
  return category[field];
}

export function getVariables(category: Upgrade | Solution) {
  return category.variables;
}

export function generateVariables(solution: Solution) {
  return [
    ...getVariables(solution).map((v) => ({
      ...v,
      value: v.defaultValue || 0,
    })),
  ];
}

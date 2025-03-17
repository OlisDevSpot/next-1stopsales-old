import { AllUpgrades } from "../upgrades/types";
import { Solution } from "./Solution";
import { solutionsMetadata } from "./solutions.config";

export class SolutionFactory {
  static createSolution(
    upgradeAccessor: AllUpgrades,
    accessor: string
  ): Solution {
    const solutions = solutionsMetadata[upgradeAccessor] || [];
    const solution = solutions.find((s) => s.accessor === accessor);
    if (!solution) throw new Error("Solution not found");
    return new Solution(upgradeAccessor, solution);
  }
}

export function createSolution(upgradeAccessor: AllUpgrades, accessor: string) {
  return SolutionFactory.createSolution(upgradeAccessor, accessor);
}

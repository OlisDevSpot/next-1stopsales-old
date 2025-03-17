import { Solution } from "./Solution";
import { solutionsMetadata, solutionsUpgradesMap } from "./solutions.config";

export class SolutionFactory {
  static createSolution(solutionAccessor: string): Solution {
    const upgradeAccessor = solutionsUpgradesMap[solutionAccessor];
    const solutions = solutionsMetadata[upgradeAccessor] || [];
    const solution = solutions.find((s) => s.accessor === solutionAccessor);
    if (!solution) throw new Error("Solution not found");
    return new Solution(upgradeAccessor, solution);
  }
}

export function createSolution(solutionAccessor: string) {
  return SolutionFactory.createSolution(solutionAccessor);
}
import { Solution } from "./Solution";
import { solutionsMetadata } from "./solutions.config";

export class SolutionFactory {
  static createSolution(accessor: string): Solution {
    const solutions = solutionsMetadata.find((s) =>
      s.solutions.find((s) => s.accessor === accessor)
    );
    if (!solutions) throw new Error("Solution Group not found");
    const solution = solutions.solutions.find((s) => s.accessor === accessor);
    if (!solution) throw new Error("Solution not found");
    return new Solution(solution);
  }
}

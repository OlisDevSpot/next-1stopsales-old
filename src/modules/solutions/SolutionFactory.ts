import { UpgradeAccessor } from "../upgrades/types";
import { Solution } from "./Solution";
import { solutionsMetadata } from "./solutions.config";

export class SolutionFactory {
  constructor(private _upgradeAccessor: UpgradeAccessor) {}

  public createSolution(solutionAccessor: string): Solution {
    const solutions = solutionsMetadata[this._upgradeAccessor] || [];
    const solution = solutions.find((s) => s.accessor === solutionAccessor);
    if (!solution) throw new Error("Solution not found");
    return new Solution(this._upgradeAccessor, solution);
  }

  public get solutions() {
    const solutionsOfUpgrade = solutionsMetadata[this._upgradeAccessor];
    if (!solutionsOfUpgrade) throw new Error("Upgrade not found");
    return solutionsOfUpgrade;
  }
}

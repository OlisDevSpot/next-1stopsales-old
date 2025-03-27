import { UpgradeAccessor } from "../upgrades/types";
import { Upgrade } from "../upgrades/Upgrade";
import { Solution } from "./Solution";
import { solutionsMetadata } from "./solutions.config";

export class SolutionFactory {
  constructor(private _upgrade: Upgrade) {}

  public createSolution(solutionAccessor: string): Solution {
    const solutions = solutionsMetadata[this._upgrade.accessor] || [];
    const solutionMetadata = solutions.find((s) => s.accessor === solutionAccessor);
    if (!solutionMetadata) throw new Error("Solution not found");
    return new Solution(this._upgrade, solutionMetadata);
  }

  public get solutions() {
    const solutionsOfUpgrade = solutionsMetadata[this._upgrade.accessor];
    if (!solutionsOfUpgrade) throw new Error("Upgrade not found");
    return solutionsOfUpgrade;
  }
}

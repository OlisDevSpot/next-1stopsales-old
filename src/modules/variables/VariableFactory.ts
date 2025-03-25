import { solutionsMetadata } from "../solutions/solutions.config";
import { UpgradeAccessor } from "../upgrades/types";
import { Variable } from "./types";
import { pricesVariables, upgradeVariables } from "./variables.config";

export class VariableFactory {
  private _variables: Variable[] = [];
  constructor(
    private upgradeAccessor: UpgradeAccessor,
    private solutionAccessor?: string
  ) {
    if (!this.solutionAccessor) {
      const uv =
        upgradeVariables[
          this.upgradeAccessor as keyof typeof upgradeVariables
        ] || [];
      this._variables = uv;
    } else if (this.solutionAccessor) {
      const variablesOfUpgrade =
        upgradeVariables[this.upgradeAccessor as keyof typeof upgradeVariables];
      const variablesOfSolution =
        solutionsMetadata[this.upgradeAccessor]!.find(
          (s) => s.accessor === this.solutionAccessor
        )?.variables || [];
      variablesOfSolution.forEach((vos) => {
        variablesOfUpgrade.forEach((vou) => {
          if (vou.accessor === vos) {
            this._variables.push(vou);
          }
        });
      });
    }
  }

  get variables(): Variable[] {
    return this._variables;
  }

  get allPrices() {
    const upgradePrices =
      pricesVariables[this.upgradeAccessor as keyof typeof pricesVariables];
    if (!upgradePrices) throw new Error("no relevant prices!");
    return upgradePrices;
  }
}

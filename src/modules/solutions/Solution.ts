import { AllUpgrades } from "../upgrades/types";
import { VariableFactory } from "../variables/VariableFactory";
import { solutionsMetadata } from "./solutions.config";
import { SolutionMetadata } from "./types";

export class Solution {
  private _accessor: string;
  private _description: string;
  private _costFormula: (params: Record<string, number>) => number;
  private variablesProvider: VariableFactory;
  constructor(private metadata: SolutionMetadata) {
    this._accessor = metadata.accessor;
    this._description = metadata.description;
    this._costFormula = metadata.costFormula;
    this.variablesProvider = new VariableFactory(
      this.getUpgradeAccessor(),
      this._accessor
    );
  }

  public getUpgradeAccessor(): AllUpgrades {
    const upgradeGroup = solutionsMetadata.find((s) =>
      s.solutions.find((s) => s.accessor === this._accessor)
    );
    if (!upgradeGroup) throw new Error("Upgrade Group not found");
    console.log({ upgradeGroup });
    return upgradeGroup.upgradeAccessor;
  }

  get info() {
    return this.metadata;
  }

  get description() {
    return this._description;
  }

  get accessor() {
    return this._accessor;
  }

  get variables() {
    return this.variablesProvider.variables;
  }

  calculateCost(params: Record<string, number>): number {
    return this._costFormula(params);
  }
}

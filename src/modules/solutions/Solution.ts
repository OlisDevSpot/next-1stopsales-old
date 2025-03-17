import { BaseConstructionCategory } from "@/types/global";
import { AllUpgradeKeys } from "../upgrades/types";
import { UpgradeFactory } from "../upgrades/UpgradeFactory";
import { VariableFactory } from "../variables/VariableFactory";
import { SolutionMetadata } from "./types";

export class Solution implements BaseConstructionCategory {
  _accessor;
  variablesProvider;
  private _costFormula: (params: { [key: string]: number }) => number;
  constructor(
    private _upgradeAccessor: AllUpgradeKeys,
    private metadata: SolutionMetadata
  ) {
    this._accessor = metadata.accessor;
    this._costFormula = metadata.costFormula;
    this.variablesProvider = new VariableFactory(
      this._upgradeAccessor,
      this._accessor
    );
  }

  get upgrade() {
    return UpgradeFactory.createUpgrade(this._upgradeAccessor);
  }

  get info() {
    return this.metadata;
  }

  get variables() {
    return this.variablesProvider.variables;
  }

  calculateCost(params: { [key: string]: number }): number {
    return this._costFormula(params);
  }
}

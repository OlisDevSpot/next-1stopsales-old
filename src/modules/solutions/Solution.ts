import { BaseConstructionCategory } from "@/types/global";
import { AllUpgradeKeys } from "../upgrades/types";
import { UpgradeFactory } from "../upgrades/UpgradeFactory";
import { VariableFactory } from "../variables/VariableFactory";
import { SolutionMetadata } from "./types";
import { Upgrade } from "../upgrades/Upgrade";
import { UpgradeVariablesAccessors } from "../variables/types";

export class Solution implements BaseConstructionCategory {
  _accessor;
  variablesProvider;
  private _upgrade: Upgrade;
  private _costFormula: (params: {
    [key in UpgradeVariablesAccessors<Upgrade["_accessor"]>]: number;
  }) => number;
  constructor(
    private _upgradeAccessor: AllUpgradeKeys,
    private _metadata: SolutionMetadata<Upgrade["_accessor"]>
  ) {
    this._accessor = _metadata.accessor;
    this._costFormula = _metadata.costFormula;
    this._upgrade = UpgradeFactory.createUpgrade(this._upgradeAccessor);
    this.variablesProvider = new VariableFactory(
      this._upgradeAccessor,
      this._accessor
    );
  }

  get upgrade() {
    return this._upgrade;
  }

  get metadata() {
    return this._metadata;
  }

  get variables() {
    return this.variablesProvider.variables;
  }

  calculateCost(params: {
    [key in UpgradeVariablesAccessors<Upgrade["_accessor"]>]: number;
  }): number {
    return this._costFormula(params);
  }
}

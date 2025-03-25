import { UpgradeAccessor } from "../upgrades/types";
import { UpgradeFactory } from "../upgrades/UpgradeFactory";
import { VariableFactory } from "../variables/VariableFactory";
import { SolutionMetadata } from "./types";
import { Upgrade } from "../upgrades/Upgrade";
import { UpgradeVariablesAccessors } from "../variables/types";

export class Solution {
  _accessor;
  private _cost: number = 0;
  private variablesProvider;
  private _upgrade: Upgrade;
  private _costFormula: (params: {
    [key in UpgradeVariablesAccessors<Upgrade["_accessor"]>]: number;
  }) => number;
  constructor(
    private _upgradeAccessor: UpgradeAccessor,
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

  get accessor() {
    return this._accessor;
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

  get cost() {
    return this._cost;
  }

  set cost(amount: number) {
    this._cost = amount;
  }

  get price() {
    return this._cost * 2.5;
  }

  get variableProvider() {
    return this.variablesProvider;
  }

  calculateCost(params: {
    [key in UpgradeVariablesAccessors<Upgrade["_accessor"]>]: number;
  }): number {
    this._cost = this._costFormula(params);
    return this._cost;
  }
}

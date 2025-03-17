import { AllUpgrades } from "../upgrades/types";
import { VariableFactory } from "../variables/VariableFactory";
import { SolutionMetadata } from "./types";

export class Solution {
  private _accessor: string;
  private _description: string;
  private _costFormula: (params: { [key: string]: string | number }) => number;
  private variablesProvider: VariableFactory;
  constructor(
    private _upgradeAccessor: AllUpgrades,
    private metadata: SolutionMetadata
  ) {
    this._accessor = metadata.accessor;
    this._description = metadata.description;
    this._costFormula = metadata.costFormula;
    this.variablesProvider = new VariableFactory(
      this._upgradeAccessor,
      this._accessor
    );
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

  calculateCost(params: { [key: string]: string | number }): number {
    return this._costFormula(params);
  }
}

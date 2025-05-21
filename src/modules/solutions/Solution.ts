import { SolutionMetadata } from "./types";
import { Upgrade } from "../upgrades/Upgrade";
import { UpgradeVariablesAccessors, Variable } from "../variables/types";

export class Solution {
  private _accessor;
  private _cost: number = 0;
  private _variables: Variable[] = [];
  private _costFormula: (params: {
    [key in UpgradeVariablesAccessors<Upgrade["_accessor"]>]: number;
  }) => number;
  constructor(
    private _upgrade: Upgrade,
    private _metadata: SolutionMetadata<Upgrade["_accessor"]>
  ) {
    this._accessor = _metadata.accessor;
    this._costFormula = _metadata.costFormula;

    const solutionVariables = this.metadata.variables || [];
    this._variables = this.variablesProvider.variables.filter((v) =>
      this.metadata.variables.includes(v.accessor)
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
    //       variablesOfSolution.forEach((vos) => {
    //         variablesOfUpgrade.forEach((vou) => {
    //           if (vou.accessor === vos) {
    //             this._variables.push(vou);
    //           }
    //         });
    //       });
    return this._variables;
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

  get variablesProvider() {
    return this.upgrade.variablesProvider;
  }

  calculateCost(params: {
    [key in UpgradeVariablesAccessors<Upgrade["_accessor"]>]: number;
  }): number {
    this._cost = this._costFormula(params);
    return this._cost;
  }
}

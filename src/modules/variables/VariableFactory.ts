import { UpgradeAccessor } from "../upgrades/types";
import { Variable } from "./types";
import { pricesVariables, upgradeVariables } from "./variables.config";

export class VariableFactory {
  private _variables: Variable[] = [];
  constructor(private upgradeAccessor: UpgradeAccessor) {
    const uv =
      upgradeVariables[this.upgradeAccessor as keyof typeof upgradeVariables] ||
      [];
    this._variables = uv;
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

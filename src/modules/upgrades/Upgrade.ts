import { AllUpgradeKeys, UpgradeMetadata } from "./types";
import { solutionsMetadata } from "../solutions/solutions.config";
import { VariableFactory } from "../variables/VariableFactory";
import { BaseConstructionCategory } from "@/types/global";
import { upgradeVariables } from "../variables/variables.config";
import { Variable } from "../variables/types";

export class Upgrade implements BaseConstructionCategory<AllUpgradeKeys> {
  _accessor;
  variablesProvider;
  _variables: Variable[];
  constructor(private _metadata: UpgradeMetadata) {
    this._accessor = _metadata.accessor;
    this._variables = upgradeVariables[this._accessor];
    this.variablesProvider = new VariableFactory(this._accessor);
  }

  get metadata() {
    return this._metadata;
  }

  get variables() {
    return this.variablesProvider.variables;
  }

  get prices() {
    return this.variablesProvider.allPrices;
  }

  get solutions() {
    const solutionsOfUpgrade = solutionsMetadata[this._accessor];
    if (!solutionsOfUpgrade) throw new Error("Upgrade not found");
    return solutionsOfUpgrade;
  }
}

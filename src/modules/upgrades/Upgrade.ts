import { AllUpgradeKeys, UpgradeMetadata } from "./types";
import { solutionsMetadata } from "../solutions/solutions.config";
import { VariableFactory } from "../variables/VariableFactory";
import { BaseConstructionCategory } from "@/types/global";

export class Upgrade implements BaseConstructionCategory<AllUpgradeKeys> {
  _accessor;
  variablesProvider;
  constructor(private metadata: UpgradeMetadata) {
    this._accessor = metadata.accessor;
    this.variablesProvider = new VariableFactory(this._accessor);
  }

  get info() {
    return this.metadata;
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

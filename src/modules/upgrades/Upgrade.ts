import { AllUpgrades, UpgradeMetadata } from "./types";
import { solutionsMetadata } from "../solutions/solutions.config";
import { VariableFactory } from "../variables/VariableFactory";

export class Upgrade {
  private _accessor: AllUpgrades;
  private variablesProvider: VariableFactory;
  constructor(private metadata: UpgradeMetadata) {
    this._accessor = metadata.accessor;
    this.variablesProvider = new VariableFactory(this._accessor);
  }

  get info(): UpgradeMetadata {
    return this.metadata;
  }

  get variables() {
    return this.variablesProvider.variables;
  }

  get prices() {
    return this.variablesProvider.allPrices;
  }

  get solutions() {
    const solutionsOfUpgrade = solutionsMetadata.find(
      (solutionsOfUpgrade) =>
        solutionsOfUpgrade.upgradeAccessor === this._accessor
    );
    if (!solutionsOfUpgrade) throw new Error("Upgrade not found");
    return solutionsOfUpgrade.solutions;
  }
}

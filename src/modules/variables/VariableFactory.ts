import { solutionsMetadata } from "../solutions/solutions.config";
import { AllUpgrades } from "../upgrades/types";
import { upgradesMetadata } from "../upgrades/upgrades.config";
import { Variable } from "./types";
import { pricesVariables, upgradeVariables } from "./variables.config";

export class VariableFactory {
  constructor(
    private upgradeAccessor: AllUpgrades,
    private solutionAccessor?: string
  ) {}
  get variables(): Variable[] {
    let variables: Variable[] = [];
    if (!this.solutionAccessor) {
      variables =
        upgradeVariables[
          this.upgradeAccessor as keyof typeof upgradeVariables
        ] || [];
    } else if (this.solutionAccessor) {
      const variablesOfUpgrade =
        upgradeVariables[this.upgradeAccessor as keyof typeof upgradeVariables];
      const variablesOfSolution =
        solutionsMetadata
          .find((ug) =>
            ug.solutions.find((s) => s.accessor === this.solutionAccessor)
          )
          ?.solutions.find((s) => s.accessor === this.solutionAccessor)
          ?.variables || [];
      variablesOfSolution.forEach((vos) => {
        variablesOfUpgrade.forEach((vou) => {
          if (vou.accessor === vos) {
            variables.push(vou);
          }
        });
      });
    }
    return variables;
  }

  get allPrices() {
    const upgradePrices =
      pricesVariables[this.upgradeAccessor as keyof typeof pricesVariables];
    if (!upgradePrices) throw new Error("no relevant prices!");
    return upgradePrices;
  }

  private get accessorType(): "upgrade" | "solution" {
    if (
      upgradesMetadata.map((u) => u.accessor).includes(this.upgradeAccessor)
    ) {
      return "upgrade";
    }
    return "solution";
  }
}

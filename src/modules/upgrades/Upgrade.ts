import { UpgradeMetadata } from "./types";
import { VariableFactory } from "../variables/VariableFactory";
import { SolutionFactory } from "../solutions/SolutionFactory";

export class Upgrade {
  _accessor;
  solutionsProvider;
  variablesProvider;
  constructor(private _metadata: UpgradeMetadata) {
    this._accessor = _metadata.accessor;
    this.solutionsProvider = new SolutionFactory(this._accessor);
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
    return this.solutionsProvider.solutions;
  }

  createSolution(solutionAccessor: string) {
    return this.solutionsProvider.createSolution(solutionAccessor);
  }
}

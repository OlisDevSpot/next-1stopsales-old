import { UpgradeMetadata } from "./types";
import { VariableFactory } from "../variables/VariableFactory";
import { SolutionFactory } from "../solutions/SolutionFactory";
export class Upgrade {
  private _accessor;
  private _solutionsProvider;
  private _variablesProvider;
  constructor(private _metadata: UpgradeMetadata) {
    this._accessor = _metadata.accessor;
    this._solutionsProvider = new SolutionFactory(this);
    this._variablesProvider = new VariableFactory(this._accessor);
  }

  get accessor() {
    return this._accessor;
  }

  get metadata() {
    return this._metadata;
  }

  get variables() {
    return this._variablesProvider.variables;
  }

  get prices() {
    return this._variablesProvider.allPrices;
  }

  get solutions() {
    return this._solutionsProvider.solutions;
  }

  get solutionsProvider() {
    return this._solutionsProvider;
  }

  get variablesProvider() {
    return this._variablesProvider;
  }

  createSolution(solutionAccessor: string) {
    return this._solutionsProvider.createSolution(solutionAccessor);
  }
}

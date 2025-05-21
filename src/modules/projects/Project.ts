import { Solution } from "../solutions/Solution";

export class Project {
  private _solutions: Solution[] = [];

  addSolution(solution: Solution) {
    const curSolutionAccessors = this.solutions.map((s) => s.accessor);
    if (curSolutionAccessors.includes(solution.accessor)) return;
    this._solutions.push(solution);
  }

  removeSolution(solution: Solution) {
    this._solutions = this._solutions.filter((s) => s !== solution);
  }

  get solutions() {
    return this._solutions;
  }

  get price() {
    return this._solutions.reduce((acc, solution) => acc + solution.price, 0);
  }
}

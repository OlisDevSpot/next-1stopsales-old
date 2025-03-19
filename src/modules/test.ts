const solutionOne = SolutionFactory.createSolution("installPanels");

solutionOne.upgradeInfo();
solutionOne.solutionInfo();

solutionOne.listVariables();
solutionOne.addVariable({
  numPanels: 10,
  wattsPerPanel: 400,
});

solutionOne.calculateCost();

function add(a: number, b: number): number {
  return a + b;
}

type Add = MyReturnType<typeof add>;

type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

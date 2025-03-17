const solutionOne = SolutionFactory.createSolution("installPanels");

solutionOne.upgradeInfo();
solutionOne.solutionInfo();

solutionOne.listVariables();
solutionOne.addVariable({
  numPanels: 10,
  wattsPerPanel: 400,
});

solutionOne.calculateCost();

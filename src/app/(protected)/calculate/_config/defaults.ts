import { createUpgrade } from "@/modules/upgrades/UpgradeFactory";

const default_upgrade_accessor = "solar";
const default_upgrade = createUpgrade(default_upgrade_accessor);
const default_solution_accessor = default_upgrade.solutions[0].accessor;
const default_solution = default_upgrade.solutionsProvider.createSolution(
  default_solution_accessor
);
const default_variables = [
  ...default_solution.variables.map((v) => ({
    ...v,
    value: v.defaultValue || 0,
  })),
];

export const DEFAULTS = {
  default_upgrade,
  default_solution,
  default_variables,
};

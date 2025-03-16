import { Metadata } from "@/types/global";
import { AllUpgrades } from "../upgrades/types";
import {
  GeneralVariableAccessors,
  UpgradeVariablesAccessors,
} from "../variables/types";

export type CostFormulaParams<T> = {
  [key in keyof T]?: number;
};

type CostFormula = (params: Record<string, number>) => number;

export interface SolutionMetadata extends Metadata {
  variables: UpgradeVariablesAccessors[];
  generalVariables: GeneralVariableAccessors[];
  costFormula: CostFormula;
}

export type SolutionsMetadata = {
  upgradeAccessor: AllUpgrades;
  solutions: SolutionMetadata[];
};

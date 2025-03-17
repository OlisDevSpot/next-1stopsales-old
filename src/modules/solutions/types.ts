import { Metadata } from "@/types/global";
import { AllUpgradeKeys } from "../upgrades/types";
import {
  GeneralVariableAccessors,
  UpgradeVariablesAccessors,
} from "../variables/types";

export type CostFormulaParams<T> = {
  [key in keyof T]?: number;
};

type CostFormula = (params: { [key: string]: number }) => number;

export interface SolutionMetadata extends Metadata {
  variables: UpgradeVariablesAccessors[];
  generalVariables: GeneralVariableAccessors[];
  costFormula: CostFormula;
}

export type SolutionsMetadata = Partial<
  Record<AllUpgradeKeys, SolutionMetadata[]>
>;

import { Metadata } from "@/types/global";
import { AllUpgradeKeys } from "../upgrades/types";
import {
  GeneralVariableAccessors,
  UpgradeVariablesAccessors,
} from "../variables/types";

export type CostFormulaParams<T> = {
  [key in keyof T]?: number;
};

export interface SolutionMetadata<UpgradeAccessor extends AllUpgradeKeys>
  extends Metadata {
  variables: UpgradeVariablesAccessors<UpgradeAccessor>[];
  generalVariables: GeneralVariableAccessors[];
  costFormula: (params: {
    [key in UpgradeVariablesAccessors<UpgradeAccessor>]: number;
  }) => number;
}

export type SolutionsMetadata = {
  [Key in AllUpgradeKeys]: SolutionMetadata<Key>[];
};

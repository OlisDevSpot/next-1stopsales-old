import { Metadata } from "@/types/global";
import { UpgradeAccessor } from "../upgrades/types";
import {
  GeneralVariableAccessors,
  UpgradeVariablesAccessors,
} from "../variables/types";

export interface SolutionMetadata<T extends UpgradeAccessor> extends Metadata {
  variables: UpgradeVariablesAccessors<T>[];
  generalVariables: GeneralVariableAccessors[];
  costFormula: (params: {
    [key in UpgradeVariablesAccessors<T>]: number;
  }) => number;
}

export type SolutionsMetadata = {
  [Accessor in UpgradeAccessor]: SolutionMetadata<Accessor>[];
};

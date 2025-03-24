import { AllUpgradeKeys } from "../upgrades/types";
import {
  generalVariables,
  upgradeVariables,
} from "../variables/variables.config";

export type AllGeneralVariablesKeys = "home" | "lot";

export interface Variable {
  accessor: string;
  type: "number" | "select" | "checkbox";
  label: string;
  options?: string[] | number[];
  defaultValue?: string | number;
}

export interface VariableWithValue extends Variable {
  value: string | number;
}

export type Variables<T extends string> = {
  [key in T]: Variable[];
};

export type UpgradeVariablesAccessors<T extends AllUpgradeKeys> =
  (typeof upgradeVariables)[T][number]["accessor"];

export type GeneralVariableAccessors =
  (typeof generalVariables)[keyof typeof generalVariables][number]["accessor"];

export interface ChosenVariable extends Variable {
  value: number;
}

// Prices (OG)
export type Prices = {
  [key in AllUpgradeKeys]: {
    [key: string]: number;
  };
};

// Prices Standardized
export interface PriceVar {
  accessor: string;
  value: number;
}

export type PricesStandardized = {
  [key in AllUpgradeKeys]: PriceVar[];
};

import { AllUpgrades } from "../upgrades/types";
import {
  generalVariables,
  upgradeVariables,
} from "../variables/variables.config";

export type UpgradeVariablesAccessors =
  (typeof upgradeVariables)[keyof typeof upgradeVariables][number]["accessor"];

export type GeneralVariableAccessors =
  (typeof generalVariables)[keyof typeof generalVariables][number]["accessor"];

export interface Variable {
  accessor: string;
  type: "number" | "select" | "boolean";
  label: string;
  options?: string[] | number[];
  defaultValue?: string | number;
}

export interface ChosenVariable extends Variable {
  value: number;
}

export type Variables = {
  [key in AllUpgrades]?: Variable[];
};

// Prices (OG)
export type Prices = {
  [key in AllUpgrades]: {
    [key: string]: number;
  };
};

// Prices Standardized
export interface PriceVar {
  accessor: string;
  value: number;
}

export type PricesStandardized = {
  [key in AllUpgrades]: PriceVar[];
};

import { Variable } from "@/modules/variables/types";
import { VariableFactory } from "@/modules/variables/VariableFactory";

export interface Metadata<T extends string = string> {
  accessor: T;
  label: string;
  description: string;
  imageUrl: string;
}

export interface BaseConstructionCategory<T extends string = string> {
  _accessor: T;
  variablesProvider: VariableFactory;
  metadata: Metadata<T>;
  variables: Variable[];
}

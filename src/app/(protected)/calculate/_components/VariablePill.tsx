import { Variable } from "@/modules/variables/types";

export const VariablePill = ({ variable }: { variable: Variable }) => {
  return (
    <li className="bg-neutral-200 rounded-lg p-2 text-nowrap">
      {variable.label}
    </li>
  );
};

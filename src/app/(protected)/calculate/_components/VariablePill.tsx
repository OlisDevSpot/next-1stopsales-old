import { Variable } from "@/modules/variables/types";

export const VariablePill = ({ variable }: { variable: Variable }) => {
  return (
    <li className="bg-neutral-700 rounded-2xl py-1 px-4 text-nowrap text-neutral-200 text-sm cursor-default select-none w-fit">
      {variable.label}
    </li>
  );
};

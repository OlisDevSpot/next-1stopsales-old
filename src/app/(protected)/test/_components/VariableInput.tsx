import { Variable } from "@/modules/variables/types";
import { useEffect, useRef } from "react";

export const VariableInput = ({ variable }: { variable: Variable }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex justify-between w-full items-center">
      <label>{variable.label}</label>
      <div className="w-[200px]">
        {variable.type === "select" && (
          <select className="bg-neutral-200 rounded-lg p-2 text-nowrap h-9 w-full">
            {variable.options?.map((option) => <option>{option}</option>)}
          </select>
        )}
        {variable.type === "boolean" ||
          (variable.type === "number" && (
            <input
              ref={inputRef}
              onClick={() => inputRef.current?.select()}
              value={variable.defaultValue}
              className="bg-neutral-200 rounded-lg p-2 text-nowrap h-9 w-full"
              type={variable.type}
            />
          ))}
      </div>
    </div>
  );
};

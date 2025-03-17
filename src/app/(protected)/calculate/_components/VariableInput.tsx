import { Variable, VariableWithValue } from "@/modules/variables/types";
import { useEffect, useRef } from "react";

interface VariableInputProps {
  variable: Variable;
  setVariables: React.Dispatch<React.SetStateAction<VariableWithValue[]>>;
}

export const VariableInput = ({
  variable,
  setVariables,
}: VariableInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const updateVariable = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    console.log(e.target.value);
    const updatedVariable = { ...variable, value: e.target.value };
    setVariables((variables) =>
      variables.map((v) =>
        v.accessor === variable.accessor ? updatedVariable : v
      )
    );
  };

  return (
    <div className="flex justify-between w-full items-center">
      <label>{variable.label}</label>
      <div className="w-[200px]">
        {variable.type === "select" && (
          <select
            className="bg-neutral-200 rounded-lg p-2 text-nowrap h-9 w-full"
            defaultValue={variable.defaultValue}
            onChange={(e) => updateVariable(e)}
          >
            {variable.options?.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        )}
        {variable.type === "checkbox" ||
          (variable.type === "number" && (
            <input
              ref={inputRef}
              onClick={() => inputRef.current?.select()}
              defaultValue={variable.defaultValue}
              onChange={(e) => updateVariable(e)}
              className="bg-neutral-200 rounded-lg p-2 text-nowrap h-9 w-full"
              type={variable.type}
            />
          ))}
      </div>
    </div>
  );
};

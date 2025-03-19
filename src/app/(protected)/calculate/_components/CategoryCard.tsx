import {
  getCategoryDetail,
  getVariables,
} from "@/modules/helper-functions/displayHelpers";
import { Solution } from "@/modules/solutions/Solution";
import { Upgrade } from "@/modules/upgrades/Upgrade";
import { VariablePill } from "./VariablePill";
import { VariableInput } from "./VariableInput";
import { VariableWithValue } from "@/modules/variables/types";
import { useEffect, useState } from "react";

export const CategoryCard = ({
  category,
  variables,
  setVariables,
}: {
  category: Upgrade | Solution;
  variables: VariableWithValue[];
  setVariables?: React.Dispatch<React.SetStateAction<VariableWithValue[]>>;
}) => {
  const [tempVariables, setTempVariables] = useState(variables);

  useEffect(() => {
    setTempVariables(variables);
  }, [variables]);

  return (
    <div
      className={`rounded-lg p-4 border flex-[2] space-y-4 ${category instanceof Solution ? "bg-indigo-100" : "bg-blue-100"}`}
    >
      <div className="flex flex-col border w-full rounded-lg p-4">
        <h3 className="leading-relaxed text-xl">
          {category instanceof Upgrade ? "Upgrade" : "Solution"}:{" "}
          {getCategoryDetail(category.metadata)}
        </h3>
        <p className="text-neutral-700">
          {getCategoryDetail(category.metadata, "description")}
        </p>
      </div>
      <div className="flex flex-col border w-full rounded-lg p-4 gap-4">
        <h4 className="text-lg font-semibold leading-loose">Variables</h4>
        <ul className="flex gap-2 flex-wrap">
          {getVariables(category).map((v) => {
            return category instanceof Solution ? (
              <VariableInput
                key={v.accessor}
                variable={v}
                setVariables={setTempVariables}
              />
            ) : (
              <VariablePill key={v.accessor} variable={v} />
            );
          })}
        </ul>
        {setVariables && (
          <button
            className="rouned-lg py-1 px-3 bg-neutral-700 rounded-lg text-neutral-200"
            onClick={() => setVariables(tempVariables)}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

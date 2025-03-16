import {
  getCategoryDetail,
  getVariables,
} from "@/modules/helper-functions/displayHelpers";
import { Solution } from "@/modules/solutions/Solution";
import { Upgrade } from "@/modules/upgrades/Upgrade";
import { PriceDisplay } from "./PriceDisplay";
import { VariablePill } from "./VariablePill";
import { VariableInput } from "./VariableInput";
import { useState } from "react";

export const CategoryCard = ({
  category,
}: {
  category: Upgrade | Solution;
}) => {
  const [variables, setVariables] = useState<Record<string, number>>({});
  if (category instanceof Solution) {
    for (const v of getVariables(category)) {
      variables[v.accessor] = 10;
    }
  }

  return (
    <div className="bg-neutral-100 rounded-lg p-4 border w-1/2 space-y-4">
      <div className="flex flex-col border w-full rounded-lg p-4">
        <h3 className="leading-relaxed text-xl">
          {category instanceof Upgrade ? "Upgrade" : "Solution"}:{" "}
          {getCategoryDetail(category.info)}
        </h3>
        <p className="text-neutral-500">
          {getCategoryDetail(category.info, "description")}
        </p>
      </div>
      <div className="flex flex-col border w-full rounded-lg p-4 gap-4">
        <h4 className="text-lg font-semibold leading-loose">Variables</h4>
        <ul className="flex gap-2 flex-wrap">
          {getVariables(category).map((v) => {
            return category instanceof Solution ? (
              <VariableInput key={v.accessor} variable={v} />
            ) : (
              <VariablePill key={v.accessor} variable={v} />
            );
          })}
        </ul>
        {category instanceof Solution && (
          <button
            className="rouned-lg py-1 px-3 bg-neutral-700 rounded-lg text-neutral-200"
            onClick={() => console.log(variables)}
          >
            Submit
          </button>
        )}
      </div>
      {category instanceof Solution && (
        <PriceDisplay solution={category} variables={variables} />
      )}
    </div>
  );
};

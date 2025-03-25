import { convertToDollars } from "@/lib/conversions";
import { Project } from "@/modules/projects/Project";
import { Solution } from "@/modules/solutions/Solution";
import { VariableWithValue } from "@/modules/variables/types";

export const PriceCalculator = ({
  project,
  solution,
  variables,
}: {
  project: Project;
  solution: Solution;
  variables: VariableWithValue[];
}) => {
  const params: any = {};
  variables.forEach((v) => {
    params[v.accessor] = v.value;
  });
  const cost = solution.calculateCost(params);

  return (
    <div className="rounded-lg flex gap-4">
      <div className="bg-yellow-100 rounded-lg p-4 border flex-1 flex flex-col gap-4">
        <div className="flex flex-col border w-full rounded-lg p-4">
          <h3 className="leading-relaxed text-xl">Cost</h3>
        </div>
        <div className="flex flex-col border w-full rounded-lg p-4 gap-4 flex-grow items-center justify-center">
          <h4 className="text-2xl">{convertToDollars(cost)}</h4>{" "}
        </div>
      </div>
      <div className="bg-green-100 rounded-lg p-4 border flex-1 flex flex-col gap-4">
        <div className="flex flex-col border w-full rounded-lg p-4">
          <h3 className="leading-relaxed text-xl">Price</h3>
        </div>
        <div className="flex flex-col border w-full rounded-lg p-4 gap-4 flex-grow items-center justify-center">
          <h4 className="text-2xl">{convertToDollars(cost * 2.5)}</h4>{" "}
        </div>
      </div>
    </div>
  );
};

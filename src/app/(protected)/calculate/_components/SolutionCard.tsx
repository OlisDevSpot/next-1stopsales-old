import { type Solution } from "@/modules/solutions/Solution";
import { VariableInput } from "./VariableInput";
import { VariableWithValue } from "@/modules/variables/types";
import { useEffect, useState } from "react";
import { Project } from "@/modules/projects/Project";
import { PriceCalculator } from "./PriceCalculator";

export const SolutionCard = ({
  project,
  setProjectPrice,
  solution,
  variables,
  setVariables,
}: {
  project: Project;
  setProjectPrice: React.Dispatch<React.SetStateAction<number>>;
  solution: Solution | null;
  variables: VariableWithValue[];
  setVariables: React.Dispatch<React.SetStateAction<VariableWithValue[]>>;
}) => {
  const [tempVariables, setTempVariables] = useState(variables);

  useEffect(() => {
    setTempVariables(variables);
  }, [variables]);

  if (!solution) {
    return (
      <div
        className={`rounded-lg p-4 border flex-1 space-y-4 bg-indigo-100 flex justify-center items-center`}
      >
        <h2>Please pick a solution</h2>
      </div>
    );
  }

  function calculateSolutionCost() {
    if (!solution) return;
    const params: any = {};
    variables.forEach((v) => {
      params[v.accessor] = v.value;
    });
    solution.calculateCost(params);
    setVariables([...tempVariables]);
  }

  return (
    <div
      className={`rounded-lg p-4 border flex-1 bg-indigo-100 flex flex-col gap-2`}
    >
      <div className="flex flex-col w-full rounded-lg">
        <h3 className="leading-relaxed text-xl">{solution.metadata.label}</h3>
        <p className="text-neutral-700">{solution.metadata.description}</p>
      </div>
      <form
        className="flex flex-col w-full rounded-lg gap-4"
        onSubmit={(e) => e.preventDefault()}
      >
        <h4 className="text-lg font-semibold leading-loose">Variables</h4>
        <ul className="flex gap-2 flex-wrap">
          {solution.variables.map((variable) => (
            <VariableInput
              key={variable.accessor}
              variable={variable}
              setTempVariables={setTempVariables}
            />
          ))}
        </ul>
        <button
          className="rouned-lg py-1 px-3 bg-neutral-700 rounded-lg text-neutral-200"
          onClick={calculateSolutionCost}
        >
          Calculate
        </button>
      </form>
      <div className="">
        <PriceCalculator cost={solution.cost} />
      </div>
      <div className="flex flex-col gap-4 border mt-auto">
        <button
          className="rouned-lg py-3 px-2 bg-slate-800 rounded-lg text-neutral-200 w-full text-lg font-semibold"
          onClick={() => {
            project.addSolution(solution);
            setProjectPrice(project.price);
          }}
        >
          Add to project
        </button>
      </div>
    </div>
  );
};

import { convertToDollars } from "@/lib/conversions";
import { Project } from "@/modules/projects/Project";
import { X } from "lucide-react";

export const ProjectTotalsCard = ({
  project,
  projectPrice,
  setProjectPrice,
}: {
  project: Project;
  projectPrice: number;
  setProjectPrice: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <div
      className={`rounded-lg p-4 border flex-1 space-y-4 bg-orange-100 flex flex-col h-full`}
    >
      <div className="flex flex-col w-full rounded-lg">
        <h3 className="leading-relaxed text-xl">Project Totals</h3>
        <p className="text-neutral-700">Your dream home awaits</p>
      </div>
      <div className="flex flex-col w-full rounded-lg gap-4 flex-grow overflow-y-auto">
        <div className="flex flex-col gap-2">
          {project.solutions.map((solution) => (
            <div
              key={solution.accessor}
              className="flex flex-col border border-red-500 rounded-lg p-2 relative pt-8"
            >
              <X
                size={20}
                className="absolute top-2 right-2 cursor-pointer"
                onClick={() => {
                  project.removeSolution(solution);
                  setProjectPrice(project.price);
                }}
              />
              <p className="text-xs text-slate-600">
                {solution.upgrade.accessor}
              </p>
              <div className="flex gap-2 justify-between">
                <div className="flex flex-col gap-2">
                  <h5>{solution.metadata.label}</h5>
                </div>
                <p>{convertToDollars(solution.price)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-between items-center rounded-lg bg-neutral-800 text-slate-200 p-2">
        <h4 className="text-lg font-semibold leading-loose">Total</h4>
        <p>{convertToDollars(projectPrice)}</p>
      </div>
    </div>
  );
};

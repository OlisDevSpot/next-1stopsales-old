import { Upgrade } from "@/modules/upgrades/Upgrade";
import { solutionsMetadata } from "@/modules/solutions/solutions.config";
import { UpgradeAccessor } from "@/modules/upgrades/types";
import { createUpgrade } from "@/modules/upgrades/UpgradeFactory";
import { type Solution } from "@/modules/solutions/Solution";
import { VariableWithValue } from "@/modules/variables/types";
import { upgradesMetadata } from "@/modules/upgrades/upgrades.config";
import { cn } from "@/lib/utils";

interface UpgradeCardProps {
  curUpgrade: Upgrade;
  curSolution: Solution | null;
  setSelectedUpgrade: (upgrade: Upgrade) => void;
  setSelectedSolution: (solution: Solution | null) => void;
  setVariables: (variables: VariableWithValue[]) => void;
}

export const UpgradeCard = ({
  curUpgrade,
  curSolution,
  setSelectedUpgrade,
  setSelectedSolution,
}: UpgradeCardProps) => {
  function updateUpgrade(upgrade: UpgradeAccessor) {
    const newUpgrade = createUpgrade(upgrade);
    setSelectedUpgrade(newUpgrade);
    setSelectedSolution(null);
  }

  return (
    <div
      className={`rounded-lg p-4 border w-full md:w-[300px] space-y-2 bg-blue-100 md:h-full flex flex-col gap-4`}
    >
      <div className="flex flex-col w-full rounded-lg">
        <div className="flex gap-2">
          <h3 className="leading-relaxed text-xl">Upgrade:</h3>
          <select
            className="focus:outline-none active:outline-none border-none"
            value={curUpgrade.metadata.accessor}
            onChange={(e) => {
              updateUpgrade(e.target.value as UpgradeAccessor);
            }}
          >
            {upgradesMetadata.map((upgrade) => (
              <option key={upgrade.accessor} value={upgrade.accessor}>
                {upgrade.label}
              </option>
            ))}
          </select>
        </div>
        <p className="text-neutral-700">{curUpgrade.metadata.description}</p>
      </div>
      <div className="flex flex-col border w-full rounded-lg gap-4 flex-grow overflow-y-scroll">
        <div className="rounded-lg flex-1 flex flex-col gap-4 h-full">
          {solutionsMetadata[curUpgrade.metadata.accessor].map((solution) => (
            <div
              key={solution.accessor}
              style={{
                background: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url('${solution.imageUrl}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              onClick={() => {
                if (curSolution?.accessor === solution.accessor) return;
                setSelectedSolution(
                  curUpgrade.createSolution(solution.accessor)
                );
              }}
              className={cn(
                "p-4 w-full aspect-[16/9] bg-blue-100 rounded-lg place-content-end text-slate-100 cursor-pointer",
                curSolution?.accessor === solution.accessor &&
                  "shadow-inner shadow-orange-400 font-bold"
              )}
            >
              {solution.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

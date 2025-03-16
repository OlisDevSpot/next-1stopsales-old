"use client";

import {
  getCategoryDetail,
  getVariables,
} from "@/modules/helper-functions/displayHelpers";
import { Solution } from "@/modules/solutions/Solution";
// import { convertToDollars } from "@/lib/conversions";
import { SolutionFactory } from "@/modules/solutions/SolutionFactory";
import { solutionsMetadata } from "@/modules/solutions/solutions.config";
import { AllUpgrades } from "@/modules/upgrades/types";
import { Upgrade } from "@/modules/upgrades/Upgrade";
import { UpgradeFactory } from "@/modules/upgrades/UpgradeFactory";
import { upgradesMetadata } from "@/modules/upgrades/upgrades.config";
import { useEffect, useState } from "react";
import { CategoryCard } from "./_components/CategoryCard";

const TestPage = () => {
  const [selectedUpgrade, setSelectedUpgrade] = useState<Upgrade>(
    UpgradeFactory.createUpgrade("solar")
  );
  const [selectedSolution, setSelectedSolution] = useState<Solution>(
    SolutionFactory.createSolution(selectedUpgrade.solutions[0].accessor)
  );

  useEffect(() => {
    setSelectedSolution(
      SolutionFactory.createSolution(selectedUpgrade.solutions[0].accessor)
    );
  }, [selectedUpgrade]);

  function updateUpgrade(upgrade: AllUpgrades) {
    setSelectedUpgrade(UpgradeFactory.createUpgrade(upgrade));
  }

  // const variables = { numPitchedBSQ: 10, numStories: 2 };
  return (
    <div className="text-base w-full space-y-4">
      <div className="flex gap-2">
        <select
          value={getCategoryDetail(selectedUpgrade.info, "accessor")}
          onChange={(e) => {
            updateUpgrade(e.target.value as AllUpgrades);
          }}
        >
          {upgradesMetadata.map((upgrade) => (
            <option key={upgrade.accessor} value={upgrade.accessor}>
              {upgrade.label}
            </option>
          ))}
        </select>
        <select
          value={getCategoryDetail(selectedSolution.info, "accessor")}
          onChange={(e) => {
            console.log(e.target.value);
            setSelectedSolution(
              SolutionFactory.createSolution(
                selectedUpgrade.solutions.find(
                  (s) => s.accessor === e.target.value
                )!.accessor
              )
            );
          }}
        >
          {solutionsMetadata
            .find(
              (solutionsOfUpgrade) =>
                solutionsOfUpgrade.upgradeAccessor ===
                selectedUpgrade.info.accessor
            )
            ?.solutions.map((solution) => (
              <option key={solution.accessor} value={solution.accessor}>
                {solution.label}
              </option>
            ))}
        </select>
      </div>
      <div className="flex gap-4 w-full">
        <CategoryCard category={selectedUpgrade} />
        <CategoryCard category={selectedSolution} />
      </div>
    </div>
  );
};

export default TestPage;

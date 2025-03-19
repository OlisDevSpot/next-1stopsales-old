"use client";

import { useEffect, useState } from "react";

import {
  generateVariables,
  getCategoryDetail,
  getVariables,
} from "@/modules/helper-functions/displayHelpers";
import { type Upgrade } from "@/modules/upgrades/Upgrade";
import { type AllUpgradeKeys } from "@/modules/upgrades/types";
import { type Solution } from "@/modules/solutions/Solution";
import { type VariableWithValue } from "@/modules/variables/types";

import { createUpgrade } from "@/modules/upgrades/UpgradeFactory";
import { upgradesMetadata } from "@/modules/upgrades/upgrades.config";
import { createSolution } from "@/modules/solutions/SolutionFactory";
import { solutionsMetadata } from "@/modules/solutions/solutions.config";

import { CategoryCard } from "./_components/CategoryCard";
import { Output } from "./_components/Output";

const default_upgrade = createUpgrade("solar");
const default_solution = createSolution(default_upgrade.solutions[0].accessor);
const default_variables = [
  ...getVariables(default_solution).map((v) => ({
    ...v,
    value: v.defaultValue || 0,
  })),
];

const TestPage = () => {
  const [selectedUpgrade, setSelectedUpgrade] =
    useState<Upgrade>(default_upgrade);
  const [selectedSolution, setSelectedSolution] =
    useState<Solution>(default_solution);
  const [variables, setVariables] =
    useState<VariableWithValue[]>(default_variables);

  useEffect(() => {
    setVariables(generateVariables(selectedSolution));
  }, [selectedSolution]);

  function updateUpgrade(upgrade: AllUpgradeKeys) {
    const newUpgrade = createUpgrade(upgrade);
    const newSolution = createSolution(newUpgrade.solutions[0].accessor);
    const newVariables = generateVariables(newSolution);
    setSelectedUpgrade(newUpgrade);
    setSelectedSolution(newSolution);
    setVariables(newVariables);
  }

  return (
    <div className="text-base w-full space-y-4">
      <div className="flex gap-2">
        <select
          value={getCategoryDetail(selectedUpgrade.metadata, "accessor")}
          onChange={(e) => {
            updateUpgrade(e.target.value as AllUpgradeKeys);
          }}
        >
          {upgradesMetadata.map((upgrade) => (
            <option key={upgrade.accessor} value={upgrade.accessor}>
              {upgrade.label}
            </option>
          ))}
        </select>
        <select
          value={getCategoryDetail(selectedSolution.metadata, "accessor")}
          onChange={(e) => {
            setSelectedSolution(
              createSolution(
                selectedUpgrade.solutions.find(
                  (s) => s.accessor === e.target.value
                )!.accessor
              )
            );
          }}
        >
          {solutionsMetadata[selectedUpgrade.metadata.accessor]!.map(
            (solution) => (
              <option key={solution.accessor} value={solution.accessor}>
                {solution.label}
              </option>
            )
          )}
        </select>
      </div>
      <div className="flex gap-4 w-full">
        <CategoryCard category={selectedUpgrade} variables={variables} />
        <CategoryCard
          category={selectedSolution}
          variables={variables}
          setVariables={setVariables}
        />
        <Output solution={selectedSolution} variables={variables} />
      </div>
    </div>
  );
};

export default TestPage;

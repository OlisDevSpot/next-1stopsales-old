"use client";

import { useEffect, useState } from "react";

import { generateVariables } from "@/modules/helper-functions/displayHelpers";
import { DEFAULTS } from "./_config/defaults";
import { type Upgrade } from "@/modules/upgrades/Upgrade";
import { type Solution } from "@/modules/solutions/Solution";
import { type VariableWithValue } from "@/modules/variables/types";

import { SolutionCard } from "./_components/SolutionCard";
import { UpgradeCard } from "./_components/UpgradeCard";
import { ProjectTotalsCard } from "./_components/ProjectTotalsCard";
import { Project } from "@/modules/projects/Project";

const CalculatePage = () => {
  const [project] = useState<Project>(new Project());
  const [selectedUpgrade, setSelectedUpgrade] = useState<Upgrade>(
    DEFAULTS.default_upgrade
  );
  const [selectedSolution, setSelectedSolution] = useState<Solution | null>(
    null
  );
  const [variables, setVariables] = useState<VariableWithValue[]>(
    DEFAULTS.default_variables
  );
  const [projectPrice, setProjectPrice] = useState(0);

  useEffect(() => {
    if (!selectedSolution) return;
    setVariables(generateVariables(selectedSolution));
  }, [selectedSolution]);

  return (
    <div className="text-base w-full space-y-4 md:h-full">
      <div className="flex flex-col md:flex-row gap-4 w-full h-full">
        <UpgradeCard
          curUpgrade={selectedUpgrade}
          curSolution={selectedSolution}
          setSelectedUpgrade={setSelectedUpgrade}
          setSelectedSolution={setSelectedSolution}
          setVariables={setVariables}
        />
        <SolutionCard
          project={project}
          setProjectPrice={setProjectPrice}
          solution={selectedSolution}
          variables={variables}
          setVariables={setVariables}
        />
        <ProjectTotalsCard
          project={project}
          projectPrice={projectPrice}
          setProjectPrice={setProjectPrice}
        />
      </div>
    </div>
  );
};

export default CalculatePage;

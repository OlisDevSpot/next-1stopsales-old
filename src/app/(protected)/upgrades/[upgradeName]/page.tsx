"use client";

import SolutionCard from "../_components/SolutionCard";
import { ArrowLeftCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { fetchSolutions } from "@/lib/data/fetchSolutions";
import { useEffect, useState } from "react";
import { Solution } from "@/models/solutions";
import { Upgrade } from "@/models/upgrades";
import { getCacheData } from "@/lib/data/getCachedData";

export default function UpgradePage({
  params,
}: {
  params: { upgradeName: string };
}) {
  const [upgrade, setUpgrade] = useState<Upgrade | null>(null);
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const router = useRouter();
  const { upgradeName } = params;

  useEffect(() => {
    getCacheData(`${upgradeName}-solutions`, () =>
      fetchSolutions(upgradeName)
    ).then((solutionsOfUpgrade) => {
      setUpgrade(solutionsOfUpgrade.upgrade);
      setSolutions(solutionsOfUpgrade.solutions);
    });
  }, [upgradeName]);

  const handleClick = (solutionName: string) => {
    router.push(`/upgrades/${upgradeName}/${solutionName}`);
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-16 flex gap-4 items-center">
        <ArrowLeftCircle
          size={24}
          className="cursor-pointer"
          onClick={() => router.back()}
        />
        <h1>{upgrade?.label}</h1>
      </div>
      <div className="grid grid-cols-3 gap-4 flex-grow">
        {solutions?.map((solution) => {
          return (
            <SolutionCard
              solution={solution}
              key={String(solution._id)}
              onClick={() => handleClick(solution.name)}
            />
          );
        })}
      </div>
    </div>
  );
}

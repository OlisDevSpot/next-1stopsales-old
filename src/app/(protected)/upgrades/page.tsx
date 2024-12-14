"use client";

import { Upgrade } from "@/models/upgrades";
import UpgradeCard from "./_components/UpgradeCard";
import fetchUpgrades from "./lib/fetchUpgrades";
import { useEffect, useState } from "react";

export default function UpgradesPage() {
  const [upgrades, setUpgrades] = useState<Upgrade[]>([]);

  useEffect(() => {
    fetchUpgrades().then((upgrades) => setUpgrades(upgrades));
  }, []);

  if (!upgrades) {
    return <div>Loading upgrades...</div>;
  }

  return (
    <div className="w-full h-full overflow-auto rounded-lg">
      <div className="grid grid-cols-3 gap-4 mr-4">
        {upgrades?.map((upgrade) => {
          const backgroundImg = `url('${upgrade.image_url}')`;
          const backgroundGradient =
            "linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.4))";
          const background = `${backgroundGradient}, ${backgroundImg}`;
          return (
            <UpgradeCard
              upgrade={upgrade}
              key={upgrade.name}
              background={background}
            />
          );
        })}
      </div>
    </div>
  );
}

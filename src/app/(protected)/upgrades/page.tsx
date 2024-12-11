"use client";

import { api } from "@convex/_generated/api";
import { useQuery } from "convex/react";
import UpgradeCard from "./_components/UpgradeCard";

export default function UpgradesPage() {
  const upgrades = useQuery(api.upgrades.getUpgrades);
  return (
    <div className="w-full h-full overflow-auto rounded-lg">
      <div className="grid grid-cols-3 gap-4">
        {upgrades?.map((upgrade) => {
          const backgroundImg = `url('${upgrade.image_url}')`;
          const backgroundGradient =
            "linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.4))";
          const background = `${backgroundGradient}, ${backgroundImg}`;
          return (
            <UpgradeCard
              upgrade={upgrade}
              key={upgrade._id}
              background={background}
            />
          );
        })}
      </div>
    </div>
  );
}

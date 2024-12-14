"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Upgrade } from "@/models/upgrades";
import { useRouter } from "next/navigation";

interface UpgradeCardProps {
  upgrade: Upgrade;
  background: string;
}

export default function UpgradeCard({ upgrade, background }: UpgradeCardProps) {
  const router = useRouter();
  return (
    <div
      className={cn(
        "w-full h-56 rounded-lg p-4 bg-center bg-cover cursor-pointer"
      )}
      style={{ backgroundImage: background }}
      onClick={() => router.push(`/upgrades/${upgrade.name}`)}
    >
      <h2 className="text-primary">{upgrade.label}</h2>
      <Badge
        variant="default"
        className={cn(
          "text-xs cursor-default",
          upgrade.type === "EE" && "bg-green-700"
        )}
      >
        {upgrade.type}
      </Badge>
      <p className="mt-2 text-muted">{upgrade.description}</p>
    </div>
  );
}

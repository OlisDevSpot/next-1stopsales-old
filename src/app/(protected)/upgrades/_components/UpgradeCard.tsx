import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Doc } from "@convex/_generated/dataModel";

interface UpgradeCardProps {
  upgrade: Doc<"upgrades">;
  background: string;
}

export default function UpgradeCard({ upgrade, background }: UpgradeCardProps) {
  return (
    <div
      className={cn("w-full h-56 rounded-lg p-4 bg-center bg-cover")}
      style={{ backgroundImage: background }}
    >
      <h2 className="text-primary">{upgrade.label}</h2>
      <Badge variant="default" className="text-xs cursor-default">
        {upgrade.type}
      </Badge>
      <p className="mt-2 text-muted">{upgrade.description}</p>
    </div>
  );
}

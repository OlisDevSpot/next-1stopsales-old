import { Upgrade } from "@/models/upgrades";

export async function fetchUpgrades(): Promise<Upgrade[]> {
  const response = await fetch("http://localhost:3000/api/upgrades");
  const upgrades = await response.json();
  return upgrades as Upgrade[];
}

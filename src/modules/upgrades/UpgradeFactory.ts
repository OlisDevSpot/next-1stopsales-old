import { AllUpgrades } from "./types";
import { Upgrade } from "./Upgrade";
import { upgradesMetadata } from "./upgrades.config";

export class UpgradeFactory {
  static createUpgrade(accessor: AllUpgrades): Upgrade {
    if (!accessor) throw new Error("Please provide an upgrade accessor");
    const upgradeMetadata = upgradesMetadata.find(
      (u) => u.accessor === accessor
    );
    if (!upgradeMetadata) throw new Error("Upgrade not found");
    return new Upgrade(upgradeMetadata);
  }
}

export function createUpgrade(accessor: AllUpgrades) {
  return UpgradeFactory.createUpgrade(accessor);
}

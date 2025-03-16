import fetchUpgradesMongo from "./fetchUpgradesMongo";

export default async function fetchUpgrades({
  seconds = 5,
}: {
  seconds?: number;
}) {
  const cache = localStorage.getItem("upgrades");
  const cachedUpgrades = cache ? JSON.parse(cache) : null;

  if (cachedUpgrades && new Date().getTime() < cachedUpgrades.expiry) {
    console.log("using cached upgrades...");
    return cachedUpgrades.upgrades;
  } else {
    // const upgrades = await fetchUpgradesJSON();
    const upgrades = await fetchUpgradesMongo();
    console.log("fetched upgrades from server...");
    localStorage.setItem(
      "upgrades",
      JSON.stringify({
        expiry: new Date().getTime() + seconds * 1000,
        upgrades,
      })
    );
    return upgrades;
  }
}

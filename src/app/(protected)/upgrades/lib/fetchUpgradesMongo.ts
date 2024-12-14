export default async function fetchUpgradesMongo() {
  const response = await fetch("http://localhost:3000/api/upgrades");
  const upgrades = await response.json();
  return upgrades;
}

export default async function fetchSolutionsMongo(upgradeName: string) {
  const response = await fetch(
    `http://localhost:3000/api/upgrades/${upgradeName}`
  );
  const upgrades = await response.json();
  return upgrades;
}

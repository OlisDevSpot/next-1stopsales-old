export default async function fetchUpgradesJSON() {
  const resposne = await fetch("/data/upgrades.json");
  const upgrades = await resposne.json();
  console.log("fetched upgrades through JSON...");
  return upgrades;
}

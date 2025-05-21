// export async function fetchSolutions(
//   upgradeName: string,
//   { seconds = 5 }: { seconds?: number }
// ) {
//   const cache = localStorage.getItem(`${upgradeName}-solutions`);
//   const cachedSolutions = cache ? JSON.parse(cache) : null;

import { Solution } from "@/models/solutions";
import { Upgrade } from "@/models/upgrades";

//   if (cachedSolutions && new Date().getTime() < cachedSolutions.expiry) {
//     console.log("using cached solutions...");
//     const { data } = cachedSolutions;
//     return {
//       solutions: data.solutions,
//       upgrade: data.upgrade,
//     };
//   } else {
//     const data = await fetchSolutionsMongo(upgradeName);
//     console.log("fetched solutions from server...");
//     localStorage.setItem(
//       `${upgradeName}-solutions`,
//       JSON.stringify({ expiry: new Date().getTime() + seconds * 1000, data })
//     );
//     return data;
//   }
// }

export async function fetchSolutions(
  upgradeName: string
): Promise<{ upgrade: Upgrade; solutions: Solution[] }> {
  const response = await fetch(
    `http://localhost:3000/api/upgrades/${upgradeName}`
  );
  const solutionsOfUpgrade = await response.json();
  return solutionsOfUpgrade as { upgrade: Upgrade; solutions: Solution[] };
}

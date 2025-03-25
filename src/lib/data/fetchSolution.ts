export default async function fetchSolution(
  solutionName: string,
  { seconds = 5 }: { seconds?: number }
) {
  const cache = localStorage.getItem(solutionName);
  const cachedSolution = cache ? JSON.parse(cache) : null;

  if (cachedSolution && new Date().getTime() < cachedSolution.expiry) {
    console.log(`using ${solutionName} from cache...`);
    const { data } = cachedSolution;
    return data;
  } else {
    const data = await fetchSolutionMongo(solutionName);
    console.log("fetched solution from server...");
    localStorage.setItem(
      `${solutionName}`,
      JSON.stringify({ expiry: new Date().getTime() + seconds * 1000, data })
    );
    return data;
  }
}

export async function fetchSolutionMongo(solutionName: string) {
  const response = await fetch(
    `http://localhost:3000/api/solutions/${solutionName}`
  );
  const solution = await response.json();
  return solution;
}

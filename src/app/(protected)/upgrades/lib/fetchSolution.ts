import fetchSolutionMongo from "./fetchSolutionMongo";

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

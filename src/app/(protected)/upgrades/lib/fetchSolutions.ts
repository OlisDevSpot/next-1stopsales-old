import fetchSolutionsMongo from "./fetchSolutionsMongo";

export default async function fetchSolutions(
  upgradeName: string,
  { seconds = 5 }: { seconds?: number }
) {
  const cache = localStorage.getItem(`${upgradeName}-solutions`);
  const cachedSolutions = cache ? JSON.parse(cache) : null;

  if (cachedSolutions && new Date().getTime() < cachedSolutions.expiry) {
    console.log("using cached solutions...");
    const { data } = cachedSolutions;
    return {
      solutions: data.solutions,
      upgrade: data.upgrade,
    };
  } else {
    const data = await fetchSolutionsMongo(upgradeName);
    console.log("fetched solutions from server...");
    localStorage.setItem(
      `${upgradeName}-solutions`,
      JSON.stringify({ expiry: new Date().getTime() + seconds * 1000, data })
    );
    return data;
  }
}

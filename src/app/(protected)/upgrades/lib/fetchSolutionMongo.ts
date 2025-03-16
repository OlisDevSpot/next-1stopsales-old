export default async function fetchSolutionMongo(solutionName: string) {
  const response = await fetch(
    `http://localhost:3000/api/solutions/${solutionName}`
  );
  const solution = await response.json();
  return solution;
}

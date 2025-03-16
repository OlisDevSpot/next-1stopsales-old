import { Solution } from "@/modules/solutions/Solution";

export const PriceDisplay = ({
  solution,
  variables,
}: {
  solution: Solution;
  variables: Record<string, number>;
}) => {
  const cost = solution.calculateCost(variables);

  return <div>{cost}</div>;
};

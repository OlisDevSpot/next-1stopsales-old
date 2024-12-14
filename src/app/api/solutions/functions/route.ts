import { dbConnect } from "@/db/dbConnect";
import Solutions from "@/models/solutions";

export async function POST() {
  await dbConnect();
  const solutions = await Solutions.find({});
  const newSolutions = solutions.map((solution) => ({
    updateOne: {
      filter: { _id: solution._id },
      update: { $set: { name: createName(solution.label) } },
    },
  }));

  await Solutions.bulkWrite(newSolutions);

  return Response.json(newSolutions);
}

function createName(label: string) {
  if (!label) return "";
  return label
    .toLowerCase()
    .replaceAll("/ ", "")
    .replaceAll("/", "")
    .replaceAll(" ", "-")
    .replaceAll("(", "")
    .replaceAll(")", "")
    .replaceAll(",", "")
    .replaceAll("&", "and");
}

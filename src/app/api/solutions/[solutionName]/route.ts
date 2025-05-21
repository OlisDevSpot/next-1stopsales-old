import { dbConnect } from "@/db/dbConnect";
import Solutions from "@/models/solutions";

export async function GET(
  _: Request,
  { params }: { params: { solutionName: string } }
) {
  const { solutionName } = params;
  await dbConnect();
  const solution = await Solutions.findOne({ name: solutionName });
  return Response.json(solution);
}

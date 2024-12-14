import { dbConnect } from "@/db/dbConnect";
import Solutions from "@/models/solutions";

export async function GET() {
  await dbConnect();
  const solutions = await Solutions.find({});
  return Response.json(solutions);
}

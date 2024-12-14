import { dbConnect } from "@/db/dbConnect";
import Solutions from "@/models/solutions";
import { Upgrades } from "@/models/upgrades";

export async function GET(
  _: Request,
  { params }: { params: { upgradeName: string } }
) {
  console.log({ params });
  await dbConnect();
  try {
    const upgrade = await Upgrades.findOne({ name: params.upgradeName });
    if (!upgrade) {
      return Response.json({ message: "Upgrade not found" }, { status: 404 });
    }
    const solutions = await Solutions.find({ upgrade_id: upgrade._id });
    return Response.json({ upgrade, solutions });
  } catch (error) {
    console.log(error);
  }
}

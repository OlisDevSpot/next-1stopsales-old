import { dbConnect } from "@/db/dbConnect";
import { Upgrades } from "@/models/upgrades";

export async function GET() {
  await dbConnect();
  const upgrades = await Upgrades.find({});

  return Response.json(upgrades);
}

export async function POST() {
  await dbConnect();
  const upgrades = await Upgrades.find({});
  console.log(upgrades);
  await Upgrades.bulkWrite(
    upgrades.map((upgrade) => ({
      updateOne: {
        filter: { _id: upgrade._id },
        update: { $set: { name: createName(upgrade.label) } },
      },
    }))
  );

  return Response.json("success");
}

const createName = (label: string) => {
  return label.replaceAll(" ", "-").toLowerCase().replaceAll("&", "and");
};

import { Model, Schema, model, models, Document } from "mongoose";

export interface Upgrade extends Document {
  name: string;
  type: string;
  label: string;
  description: string;
  price: number;
  image_url: string;
  extent: string;
}

const upgradeSchema = new Schema({
  name: { type: String, required: true },
  label: { type: String, required: true },
  type: { type: String, required: true, enum: ["GC", "EE"] },
  description: { type: String },
  price: { type: Number, required: false },
  image_url: { type: String },
  extent: { type: String, required: true, enum: ["lot", "home"] },
});

export const Upgrades: Model<Upgrade> =
  models.upgrades || model<Upgrade>("upgrades", upgradeSchema);

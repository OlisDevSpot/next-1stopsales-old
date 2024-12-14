import { Schema, model, models, Document, Model } from "mongoose";

export interface Solution extends Document {
  name: string;
  label: string;
  description: string;
  image_url: string;
  scope_of_work_init: string;
  upgrade_id: Document;
}

const solutionsSchema = new Schema<Solution>({
  name: { type: String, required: true },
  label: { type: String, required: true },
  description: { type: String },
  image_url: { type: String },
  scope_of_work_init: { type: String },
  upgrade_id: { type: Schema.Types.ObjectId, ref: "upgrades" },
});

const Solutions: Model<Solution> =
  models.solutions || model<Solution>("solutions", solutionsSchema);

export default Solutions;

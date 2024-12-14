import mongoose, { Mongoose } from "mongoose";

/* eslint-disable no-var */
declare global {
  var mongoose: {
    promise: Promise<Mongoose> | null;
    conn: Mongoose | null;
  };
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function dbConnect() {
  if (cached.conn) {
    console.log("Mongo connection already established!");
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(process.env.MONGO_URI!)
      .then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  console.log("Created new Mongo connection!");

  return cached.conn;
}

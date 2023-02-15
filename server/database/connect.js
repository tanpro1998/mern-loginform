import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

async function connect() {
  const mongodb = await MongoMemoryServer.create();
  const getUri = mongodb.getUri();

  mongoose.set("strictQuery", true);

  const db = await mongoose.connect(getUri);
  console.log("Database connected");
  return db;
}

export default connect;

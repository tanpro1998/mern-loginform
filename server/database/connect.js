import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import ENV from "../config.js"

async function connect() {
  const mongodb = await MongoMemoryServer.create();
  const getUri = mongodb.getUri();

  mongoose.set("strictQuery", true);

  const db = await mongoose.connect(ENV.MONGO_DB_ATLAS);
  console.log("Database connected");
  return db;
}

export default connect;

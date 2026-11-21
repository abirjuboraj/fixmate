import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI as string;

if (!uri) {
  throw new Error("MONGODB_URI environment variable is not defined");
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClient: MongoClient | undefined;
}

if (!global._mongoClient) {
  global._mongoClient = new MongoClient(uri, {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 15000,
    socketTimeoutMS: 45000,
  });
}

client = global._mongoClient;

export default client;

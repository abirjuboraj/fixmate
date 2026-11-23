// import {
//   MongoClient,
//   MongoServerSelectionError,
//   MongoTopologyClosedError,
// } from "mongodb";

// const uri = process.env.MONGODB_URI as string;

// if (!uri) {
//   throw new Error("MONGODB_URI environment variable is not defined");
// }


// declare global {
//   var _fixmateMongoClient: MongoClient | undefined;
//   var _fixmateMongoConnectPromise: Promise<MongoClient> | undefined;
// }

// function createClient(): MongoClient {
//   return new MongoClient(uri, {
//     maxPoolSize: 10,
//     serverSelectionTimeoutMS: 5000,
//     socketTimeoutMS: 45000,
//     retryWrites: true,
//   });
// }

// if (!global._fixmateMongoClient) {
//   global._fixmateMongoClient = createClient();
// }
// const client: MongoClient = global._fixmateMongoClient;

// function isConnected(): boolean {
//   const topology = (
//     client as unknown as { topology?: { isConnected(): boolean } }
//   ).topology;
//   return topology?.isConnected() === true;
// }

// const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// async function connectWithRetry(): Promise<MongoClient> {
//   let lastError: unknown;

//   for (let attempt = 0; attempt < 3; attempt++) {
//     try {
//       await client.connect();
//       return client;
//     } catch (error) {
//       lastError = error;
//       console.warn(
//         `[MongoDB] Connection attempt ${attempt + 1}/3 failed: ${
//           error instanceof Error ? error.message : String(error)
//         }`,
//       );
//       if (attempt < 2) await sleep(300 * (attempt + 1));
//     }
//   }

//   throw lastError;
// }

// export async function ensureConnected(): Promise<MongoClient> {
//   if (isConnected()) return client;

//   if (!global._fixmateMongoConnectPromise) {
//     global._fixmateMongoConnectPromise = connectWithRetry().finally(() => {
//       global._fixmateMongoConnectPromise = undefined;
//     });
//   }

//   return global._fixmateMongoConnectPromise;
// }

// export async function getDb() {
//   const connected = await ensureConnected();
//   return connected.db("fixmate");
// }


// export function isTransientDbError(error: unknown): boolean {
//   if (
//     error instanceof MongoTopologyClosedError ||
//     error instanceof MongoServerSelectionError
//   ) {
//     return true;
//   }

//   const code = (error as { code?: number } | null)?.code;
  
//   return [
//     6, 7, 89, 91, 189, 262, 9001, 10107, 11600, 11602, 13435, 13436,
//   ].includes(Number(code));
// }


// export default client;

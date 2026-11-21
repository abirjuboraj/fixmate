import {
  MongoClient,
  MongoServerSelectionError,
  MongoTopologyClosedError,
} from "mongodb";

const uri = process.env.MONGODB_URI as string;

if (!uri) {
  throw new Error("MONGODB_URI environment variable is not defined");
}

/**
 * RESILIENT MONGODB CONNECTION (Vercel serverless safe)
 * ----------------------------------------------------
 * The previous version cached a client and never reconnected it. The MongoDB
 * v7 driver CLOSES the topology whenever a connection attempt fails, and its
 * auto-connect refuses to run again once a (closed) topology object exists.
 * Result: one transient Atlas hiccup permanently broke that warm Vercel
 * instance -> "Topology is closed" / "Server selection timed out" everywhere.
 *
 * This version:
 *  1. Keeps ONE stable client object (the Better Auth adapter captures it at
 *     import time). Calling client.connect() again on that same object builds
 *     a fresh topology, so all existing Db/Collection references stay valid.
 *  2. Verifies the topology before every operation (ensureConnected).
 *  3. Retries connection attempts with a short backoff and de-duplicates
 *     concurrent reconnect attempts.
 */

declare global {
  var _fixmateMongoClient: MongoClient | undefined;
  var _fixmateMongoConnectPromise: Promise<MongoClient> | undefined;
}

function createClient(): MongoClient {
  return new MongoClient(uri, {
    maxPoolSize: 10,
    // Fail fast instead of blocking a request for 15s when Atlas is briefy
    // unavailable; the retries below fit inside normal function timeouts.
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    retryWrites: true,
  });
}

// One stable instance for the whole warm function lifetime.
if (!global._fixmateMongoClient) {
  global._fixmateMongoClient = createClient();
}
const client: MongoClient = global._fixmateMongoClient;

/** `topology` is internal to the driver, so read it with a narrow cast. */
function isConnected(): boolean {
  const topology = (
    client as unknown as { topology?: { isConnected(): boolean } }
  ).topology;
  return topology?.isConnected() === true;
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function connectWithRetry(): Promise<MongoClient> {
  let lastError: unknown;

  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      // On a closed topology this creates a brand new one on the SAME client.
      await client.connect();
      return client;
    } catch (error) {
      lastError = error;
      console.warn(
        `[MongoDB] Connection attempt ${attempt + 1}/3 failed: ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
      if (attempt < 2) await sleep(300 * (attempt + 1));
    }
  }

  throw lastError;
}

/**
 * Returns the shared client with a healthy topology. Safe to call before
 * every database operation; cheap when already connected.
 */
export async function ensureConnected(): Promise<MongoClient> {
  if (isConnected()) return client;

  // De-duplicate reconnects from concurrent requests on the same instance.
  if (!global._fixmateMongoConnectPromise) {
    global._fixmateMongoConnectPromise = connectWithRetry().finally(() => {
      global._fixmateMongoConnectPromise = undefined;
    });
  }

  return global._fixmateMongoConnectPromise;
}

/** Get the app database only after the connection is known to be healthy. */
export async function getDb() {
  const connected = await ensureConnected();
  return connected.db("fixmate");
}

/**
 * True for errors where a retry after reconnecting makes sense.
 * These are transient Atlas/network conditions, not application bugs.
 */
export function isTransientDbError(error: unknown): boolean {
  if (
    error instanceof MongoTopologyClosedError ||
    error instanceof MongoServerSelectionError
  ) {
    return true;
  }

  const code = (error as { code?: number } | null)?.code;
  // 6 HostUnreachable, 7 HostNotFound, 89 NetworkTimeout, 91 ShutdownInProgress,
  // 189 PrimarySteppedDown, 262 ExceededTimeLimit, 9001 SocketException,
  // 10107 NotWritablePrimary, 11600 InterruptedAtShutdown, 11602 InterruptedDueToReplStateChange,
  // 13435 NotPrimaryNoSecondaryOk, 13436 NotPrimaryOrSecondary
  return [
    6, 7, 89, 91, 189, 262, 9001, 10107, 11600, 11602, 13435, 13436,
  ].includes(Number(code));
}

/** Kept for backwards compatibility with existing imports. */
export default client;

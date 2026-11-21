import { betterAuth } from "better-auth"
import { mongodbAdapter } from "@better-auth/mongo-adapter"
import client, { ensureConnected, isTransientDbError } from "./db"

// Warm up the connection before the adapter is created. Its first-use index
// setup then runs on a healthy topology instead of logging scary
// "Could not create the MongoDB index ... Topology is closed" warnings.
await ensureConnected().catch(() => {
  // A failure here is not fatal: ensureConnected() retries on every operation.
})

const db = client.db("fixmate")

const baseAdapter = mongodbAdapter(db, { client })

// Reads are safe to retry once if Atlas blips in the middle of a request.
// Writes (create/update/delete/transaction) are NOT retried here, because a
// retried write could run twice if the first attempt actually committed.
const READ_METHODS = new Set(["findOne", "findMany", "count"])

/**
 * Thin wrapper around the Mongo adapter that:
 *  1. checks/repairs the connection before every database call, and
 *  2. retries read calls once after a transient Atlas/network error.
 *
 * This is what stops a single failed connection from turning into
 * "Topology is closed" on every page after sign-in on Vercel.
 */
const resilientAdapter = new Proxy(baseAdapter, {
  get(target, prop) {
    const value = Reflect.get(target, prop)
    if (typeof value !== "function") return value

    return async (...args: unknown[]) => {
      const run = async () => {
        await ensureConnected()
        return (value as (...a: unknown[]) => unknown).apply(target, args)
      }

      try {
        return await run()
      } catch (error) {
        if (
          typeof prop === "string" &&
          READ_METHODS.has(prop) &&
          isTransientDbError(error)
        ) {
          console.warn(`[MongoDB] Retrying ${prop} after transient error`)
          return run()
        }
        throw error
      }
    }
  },
})

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "customer",
        required: false,
        input: true,
      },
      phone: {
        type: "string",
        required: false,
        input: true,
      },
      area: {
        type: "string",
        required: false,
        input: true,
      },
      bio: {
        type: "string",
        required: false,
        input: true,
      },
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  database: resilientAdapter,
})

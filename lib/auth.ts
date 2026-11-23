// import { betterAuth } from "better-auth"
// import { mongodbAdapter } from "@better-auth/mongo-adapter"
// import client, { ensureConnected, isTransientDbError } from "./db"
// import { jwt } from "better-auth/plugins"

// await ensureConnected().catch(() => {})

// const db = client.db("fixmate")

// const baseAdapter = mongodbAdapter(db, { client })

// const READ_METHODS = new Set(["findOne", "findMany", "count"])

// const resilientAdapter = new Proxy(baseAdapter, {
//   get(target, prop) {
//     const value = Reflect.get(target, prop)
//     if (typeof value !== "function") return value

//     return async (...args: unknown[]) => {
//       const run = async () => {
//         await ensureConnected()
//         return (value as (...a: unknown[]) => unknown).apply(target, args)
//       }

//       try {
//         return await run()
//       } catch (error) {
//         if (
//           typeof prop === "string" &&
//           READ_METHODS.has(prop) &&
//           isTransientDbError(error)
//         ) {
//           console.warn(`[MongoDB] Retrying ${prop} after transient error`)
//           return run()
//         }
//         throw error
//       }
//     }
//   },
// })

// export const auth = betterAuth({
//   baseURL: process.env.BETTER_AUTH_URL,
//   emailAndPassword: {
//     enabled: true,
//     autoSignIn: true,
//   },
//   plugins: [jwt()],
//   session: {
//     cookieCache: {
//       enabled: true,
//       strategy: "jwt",
//       maxAge: 2 * 24 * 60 * 60,
//     },
//   },
//   user: {
//     additionalFields: {
//       role: {
//         type: "string",
//         defaultValue: "customer",
//         required: false,
//         input: true,
//       },
//       phone: {
//         type: "string",
//         required: false,
//         input: true,
//       },
//       area: {
//         type: "string",
//         required: false,
//         input: true,
//       },
//       bio: {
//         type: "string",
//         required: false,
//         input: true,
//       },
//     },
//   },
//   socialProviders: {
//     google: {
//       clientId: process.env.GOOGLE_CLIENT_ID as string,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//     },
//   },
//   database: resilientAdapter,
//   databaseHooks: {
//     user: {
//       create: {
//         async before(user) {
//           if (user.role === "customer" || user.role === "technician") {
//             return
//           }

//           return { data: { ...user, role: "customer" } }
//         },
//       },
//     },
//   },
// })


import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { jwt } from "better-auth/plugins"
const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Missing MONGO_URI environment variable");
}

const client = new MongoClient(uri, {
  maxPoolSize: 10,
});

const clientPromise = client.connect();

const db = (await clientPromise).db("fixmate");

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
  plugins: [jwt()],
  session: {
    cookieCache: {
      enabled: true,
      strategy: "jwt",
      maxAge: 2 * 24 * 60 * 60,
    },
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
  databaseHooks: {
    user: {
      create: {
        async before(user) {
          if (user.role === "customer" || user.role === "technician") {
            return
          }

          return { data: { ...user, role: "customer" } }
        },
      },
    },
  },
   database: mongodbAdapter(db, {
    client,
  }),
})




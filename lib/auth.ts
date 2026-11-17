import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db("fixmate");

export const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
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
    database: mongodbAdapter(db, {
        client,
    }),
});
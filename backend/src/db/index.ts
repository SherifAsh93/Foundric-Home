// This file will be used for DB Connection
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import dotenv from "dotenv";
dotenv.config();

// first check that I have DB connection string
if (!process.env.DB_URL) {
  throw new Error("DB_URL is not defined");
}

// Create postgres client
const client = postgres(process.env.DB_URL);

export const db = drizzle(client, { schema }); // to use db in the future in any operation [in queries file.]

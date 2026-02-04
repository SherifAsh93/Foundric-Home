// This file will be used for DB Connection
import { drizzle } from "drizzle-orm/singlestore/driver";
import { Pool } from "pg";
import * as schema from "./schema";
import dotenv from "dotenv";
dotenv.config();

// first check that I have DB connection string
if (!process.env.DB_URL) {
  throw new Error("DB_URL is not defined");
}
// if okay, initialize PstgreSql connection pool
const pool = new Pool({ connectionString: process.env.DB_URL });

pool.on("connect", () => {
  console.log("Database Connected Successfully");
});

pool.on("error", (err) => {
  console.error("Database Connection Error", err);
});

export const db = drizzle({ client: pool, schema }); // to use db in the future in any operation

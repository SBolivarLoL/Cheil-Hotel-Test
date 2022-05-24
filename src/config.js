import {config} from "dotenv";

/* Loading the environment variables from the .env file. */
config();

/* Exporting the database configuration. */
export default {
  host: process.env.DB_HOST || "",
  database: process.env.DB_NAME || "",
  user: process.env.DB_USER || "",
  password: process.env.DB_PASSWORD || ""
}
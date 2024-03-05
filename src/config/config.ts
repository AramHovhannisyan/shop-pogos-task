import { fromEnv } from "../utils/configUtils";

const SERVER_PORT = fromEnv("SERVER_PORT") || 3000;
const DB_PORT = fromEnv("POSTGRES_DB_LOCAL_PORT") || 5432;

const SMTP_HOST = fromEnv("SMTP_HOST") || "";
const SMTP_PORT = fromEnv("SMTP_PORT") || "";
const SMTP_USER = fromEnv("SMTP_USER") || "";
const SMTP_PASSWORD = fromEnv("SMTP_PASSWORD") || "";

export const config = {
  server: {
    port: SERVER_PORT,
  },
  db: {
    port: DB_PORT,
  },
  smtp: {
    host: SMTP_HOST,
    port: SMTP_PORT,
    user: SMTP_USER,
    pass: SMTP_PASSWORD,
  },
};

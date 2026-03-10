const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const requiredVars = ["MONGODB_URI", "SESSION_SECRET"];

const missing = requiredVars.filter((name) => !process.env[name]);
if (missing.length) {
  throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
}

const env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: Number(process.env.PORT || 3000),
  MONGODB_URI: process.env.MONGODB_URI,
  SESSION_SECRET: process.env.SESSION_SECRET,
  TRUST_PROXY: process.env.TRUST_PROXY === "true",
  REQUIRE_TRUST_PROXY: process.env.REQUIRE_TRUST_PROXY === "true",
  BCRYPT_SALT_ROUNDS: Number(process.env.BCRYPT_SALT_ROUNDS || 12),
  LOGIN_RATE_LIMIT_WINDOW_MS: Number(process.env.LOGIN_RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000),
  LOGIN_RATE_LIMIT_MAX: Number(process.env.LOGIN_RATE_LIMIT_MAX || 5),
  RESUME_MAX_SIZE_BYTES: Number(process.env.RESUME_MAX_SIZE_BYTES || 2 * 1024 * 1024),
};

if (Number.isNaN(env.PORT) || env.PORT <= 0) {
  throw new Error("Invalid PORT value");
}

if (Number.isNaN(env.BCRYPT_SALT_ROUNDS) || env.BCRYPT_SALT_ROUNDS < 8) {
  throw new Error("Invalid BCRYPT_SALT_ROUNDS value");
}

if (Number.isNaN(env.LOGIN_RATE_LIMIT_WINDOW_MS) || env.LOGIN_RATE_LIMIT_WINDOW_MS <= 0) {
  throw new Error("Invalid LOGIN_RATE_LIMIT_WINDOW_MS value");
}

if (Number.isNaN(env.LOGIN_RATE_LIMIT_MAX) || env.LOGIN_RATE_LIMIT_MAX <= 0) {
  throw new Error("Invalid LOGIN_RATE_LIMIT_MAX value");
}

if (Number.isNaN(env.RESUME_MAX_SIZE_BYTES) || env.RESUME_MAX_SIZE_BYTES <= 0) {
  throw new Error("Invalid RESUME_MAX_SIZE_BYTES value");
}

if (env.NODE_ENV === "production" && env.REQUIRE_TRUST_PROXY && !env.TRUST_PROXY) {
  throw new Error("TRUST_PROXY must be true when REQUIRE_TRUST_PROXY is enabled in production.");
}

module.exports = env;

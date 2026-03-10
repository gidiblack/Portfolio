require("dotenv").config();
const bcrypt = require("bcrypt");
const readline = require("readline");
const connectDB = require("../config/db");
const Admin = require("../models/Admin");
const env = require("../config/env");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function createAdmin() {
  await connectDB();
  rl.question("Enter admin username: ", async (username) => {
    rl.question("Enter admin password: ", async (password) => {
      const passwordHash = await bcrypt.hash(password, env.BCRYPT_SALT_ROUNDS);
      try {
        await Admin.create({ username, passwordHash });
        console.log("Admin user created successfully.");
      } catch (err) {
        console.error("Error creating admin:", err.message);
      } finally {
        rl.close();
        process.exit(0);
      }
    });
  });
}

createAdmin();

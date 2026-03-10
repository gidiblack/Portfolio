require("dotenv").config();
const connectDB = require("../config/db");
const seedDefaults = require("../seeds/defaultContent");

(async () => {
  await connectDB();
  await seedDefaults();
  console.log("Seeded default content.");
  process.exit(0);
})();

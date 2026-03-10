const app = require("./src/app");
const http = require("http");
const connectDB = require("./src/config/db");
const env = require("./src/config/env");
const fs = require("fs");
const path = require("path");

const PORT = env.PORT;

if (env.TRUST_PROXY) {
  app.set("trust proxy", 1);
}

const resumeUploadPath = path.join(__dirname, "uploads", "resume");
if (!fs.existsSync(resumeUploadPath)) {
  fs.mkdirSync(resumeUploadPath, { recursive: true });
}

try {
  fs.accessSync(resumeUploadPath, fs.constants.W_OK);
} catch {
  throw new Error(`Resume upload path is not writable: ${resumeUploadPath}`);
}

// Connect to MongoDB first, then start server
connectDB().then(() => {
  const server = http.createServer(app);
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

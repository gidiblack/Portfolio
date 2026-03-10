const express = require("express");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const multer = require("multer");
const requireAuth = require("../middleware/auth");
const { showResume, uploadResume } = require("../controllers/admin.resume.controller");

const router = express.Router();

const uploadRoot = path.join(__dirname, "../../uploads/resume");
if (!fs.existsSync(uploadRoot)) {
  fs.mkdirSync(uploadRoot, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadRoot),
  filename: (req, file, cb) => {
    const randomName = crypto.randomBytes(16).toString("hex");
    cb(null, `${randomName}.pdf`);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: Number(process.env.RESUME_MAX_SIZE_BYTES || 2097152),
  },
  fileFilter: (req, file, cb) => {
    const isPdfMime = file.mimetype === "application/pdf";
    const hasPdfExtension = path.extname(file.originalname || "").toLowerCase() === ".pdf";

    if (!isPdfMime || !hasPdfExtension) {
      return cb(new Error("Only PDF files are allowed"));
    }
    return cb(null, true);
  },
});

router.get("/admin/resume", requireAuth, showResume);
router.post(
  "/admin/resume",
  requireAuth,
  (req, res, next) => {
    upload.single("resumeFile")(req, res, (err) => {
      if (!err) return next();

      const maxSizeMb = Math.round((Number(process.env.RESUME_MAX_SIZE_BYTES || 2097152) / (1024 * 1024)) * 100) / 100;
      const message = err.code === "LIMIT_FILE_SIZE" ? `File exceeds ${maxSizeMb} MB limit.` : err.message;

      return res.status(400).render("admin/resume", {
        resumeAsset: null,
        maxSizeMb,
        error: message,
      });
    });
  },
  uploadResume,
);

module.exports = router;

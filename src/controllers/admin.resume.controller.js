const path = require("path");
const fs = require("fs");
const ResumeAsset = require("../models/ResumeAsset");

const uploadRoot = path.join(__dirname, "../../uploads/resume");

if (!fs.existsSync(uploadRoot)) {
  fs.mkdirSync(uploadRoot, { recursive: true });
}

async function showResume(req, res) {
  const resumeAsset = await ResumeAsset.findOne();
  res.render("admin/resume", {
    resumeAsset,
    maxSizeMb: Math.round((Number(process.env.RESUME_MAX_SIZE_BYTES || 2097152) / (1024 * 1024)) * 100) / 100,
    error: null,
  });
}

async function uploadResume(req, res) {
  if (!req.file) {
    const resumeAsset = await ResumeAsset.findOne();
    return res.status(400).render("admin/resume", {
      resumeAsset,
      maxSizeMb: Math.round((Number(process.env.RESUME_MAX_SIZE_BYTES || 2097152) / (1024 * 1024)) * 100) / 100,
      error: "Please upload a valid PDF file.",
    });
  }

  const previous = await ResumeAsset.findOne();
  const currentUrl = `/uploads/resume/${req.file.filename}`;

  await ResumeAsset.findOneAndUpdate(
    {},
    {
      currentUrl,
      fileName: req.file.originalname,
      uploadedAt: new Date(),
    },
    { upsert: true, new: true, setDefaultsOnInsert: true },
  );

  if (
    previous &&
    previous.currentUrl &&
    previous.currentUrl.startsWith("/uploads/resume/") &&
    previous.currentUrl !== currentUrl
  ) {
    const normalizedPreviousPath = previous.currentUrl.replace(/^\//, "");
    const previousFilePath = path.join(__dirname, "../../", normalizedPreviousPath);
    fs.unlink(previousFilePath, () => {});
  }

  return res.redirect("/admin/resume");
}

module.exports = {
  showResume,
  uploadResume,
};

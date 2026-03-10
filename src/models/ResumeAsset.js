const mongoose = require("mongoose");

const resumeAssetSchema = new mongoose.Schema(
  {
    currentUrl: { type: String, required: true },
    fileName: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

module.exports = mongoose.model("ResumeAsset", resumeAssetSchema);

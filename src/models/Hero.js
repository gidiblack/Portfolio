const mongoose = require("mongoose");

const heroSchema = new mongoose.Schema(
  {
    headline: { type: String, required: true },
    subheadline: { type: String, required: true },
    ctaText: { type: String, required: true },
    ctaUrl: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Hero", heroSchema);

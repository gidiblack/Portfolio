const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema(
  {
    bio: { type: String, required: true },
    highlights: [{ type: String }],
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

module.exports = mongoose.model("About", aboutSchema);

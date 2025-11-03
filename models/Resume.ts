import mongoose, { Schema, models } from "mongoose";

const resumeSchema = new Schema({
  userId: { type: String, ref: "User", required: true },
  atsScore: Number,
  resumeAnalysis: [String],
  optimizationSuggestions: [String],
  createdAt: { type: Date, default: Date.now },
});

export default models.Resume || mongoose.model("Resume", resumeSchema);

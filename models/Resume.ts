import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema(
  {
    pdfUrl: { type: String, required: true },
    userId: { type: String, required: true },
    scores: {
      tone_score: { type: Number, default: 0 },
      structure_score: { type: Number, default: 0 },
      skills_match_score: { type: Number, default: 0 },
    },
    ats_score: {
      score: { type: Number, default: 0 },
      justification: { type: String, default: "" },
    },
    resume_analysis: { type: [String], default: [] },
    optimization_suggestions: { type: [String], default: [] },
  },
  { timestamps: true }
);

export default mongoose.models.Resume || mongoose.model("Resume", ResumeSchema);

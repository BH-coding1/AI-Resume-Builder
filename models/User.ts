import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema({
  clerkId: { type: String, required: true, unique: true },
  email: String,
  name: String,
  resumes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Resume" }],
});

export default models.User || mongoose.model("User", userSchema);

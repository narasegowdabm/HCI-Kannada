import mongoose from "mongoose";

const ProgressSchema = new mongoose.Schema({
  attempts: { type: Number, default: 0 },
  success: { type: Number, default: 0 },
});

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // Store progress as a Map, where each key is a letter
    progress: {
      type: Map,
      of: ProgressSchema,
      default: {},
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);

import mongoose from "mongoose";

const InvitationSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  token: { type: String, required: true },
  status: { type: String, enum: ["pending", "accepted", "expired"], default: "pending" },
  createdAt: { type: Date, default: Date.now, expires: '7d' } // Expires after 7 days
});

export default mongoose.models.Invitation || mongoose.model("Invitation", InvitationSchema);

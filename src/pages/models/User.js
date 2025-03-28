// import mongoose from "mongoose";

// const UserSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true }, // User name
//     email: { type: String, required: true, unique: true }, // Email
//     role: { type: String, enum: ["admin", "user"], default: "user" }, // Role
//     createdAt: { type: Date, default: Date.now }, // Timestamp
//   },
//   { collection: "users" } // Ensure the collection name is correctly set
// );

// // Fix model export issue
// export default mongoose.models.UsersData || mongoose.model("UsersData", UserSchema);
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
  },
  { timestamps: true }
);

// Check if model already exists before redefining
export default mongoose.models.User || mongoose.model("User", UserSchema);


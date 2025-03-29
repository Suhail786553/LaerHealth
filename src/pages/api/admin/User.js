import dbConnect from "../../utils/dbConnect";
import UserModel from "../../models/UserModel";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const users = await UserModel.find({}).lean(); // ✅ Use .lean()
      return res.status(200).json({ success: true, users });
    } catch (error) {
      console.error("Error fetching users:", error);
      return res.status(500).json({ success: false, error: "Failed to fetch users" });
    }
  }

  res.setHeader("Allow", ["GET"]);
  return res.status(405).json({ success: false, message: `Method ${req.method} Not Allowed` });
}

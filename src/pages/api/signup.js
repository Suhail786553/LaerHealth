import dbConnect from "../utils/dbConnect";
import User from "../models/UserModel";
import Invitation from "../models/Invitation";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    const { name, email, password } = req.body;

    try {
      // Check if email exists in invitations
      const invitation = await Invitation.findOne({ email });

      if (!invitation) {
        return res.status(400).json({ error: "No invitation found for this email." });
      }

      // Check if user already exists
      let user = await User.findOne({ email });

      if (!user) {
        user = await User.create({ name, email, role: "user" });
      }

      // Delete invitation after signup
      await Invitation.deleteOne({ email });

      res.status(201).json(user);
    } catch (error) {
      console.error("Signup error:", error);
      res.status(500).json({ error: "Signup failed." });
    }
  } else {
    res.status(405).end();
  }
}

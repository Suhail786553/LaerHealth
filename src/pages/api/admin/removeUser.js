import dbConnect from "../../utils/dbConnect";
import User from "./User";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "DELETE") {
    const { id } = req.query;
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User removed successfully!" });
  } else {
    res.status(405).end();
  }
}
